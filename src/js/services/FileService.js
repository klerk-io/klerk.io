import axios from "axios";

export default class FileService {
  constructor(progress) {
    this._proxy = process.env.CORS_PROXY;

    this._axios = axios.create({
      // headers: {
      //   "Access-Control-Expose-Headers": "Content-Length"
      // },
      maxContentLength: process.env.MAX_RAW_CONTENT_LENGTH, // Base64 adds to the filesize (n/3*4)
      maxRedirects: 5,
      onDownloadProgress: progress.constructor.update,
      responseType: "blob"
    });
  }

  get(url) {
    return this._axios.get(this._proxy + url)
      .then(response => {
        const data = new Blob([response.data], {
          type: response.headers["content-type"]
        });

        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = event => { resolve(event.target.result); };
          reader.onerror = error => { reject(error); };
          reader.readAsDataURL(data);
        });
      });
  };
};