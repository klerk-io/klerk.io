const FileService = (function(axios, progress) {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  const Axios = axios.create({
    // headers: {
    //   "Access-Control-Expose-Headers": "Content-Length"
    // },
    maxContentLength: 786365, // Base64 adds to the filesize (n/3*4)
    maxRedirects: 5,
    onDownloadProgress: progress.update,
    responseType: "blob"
  });

  const get = function(url) {
    return Axios.get(CORS_PROXY + url).then(function(response) {
      const data = new Blob([response.data], {
        type: response.headers["content-type"]
      });

      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = function(event) {
          resolve(event.target.result);
        };
        reader.onerror = function(e) {
          reject(e);
        };
        reader.readAsDataURL(data);
      });
    });
  };

  return {
    get: get
  };
})(axios, ProgressService);