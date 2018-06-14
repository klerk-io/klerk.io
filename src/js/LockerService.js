const LockerService = (function (axios, progress) {
  // @todo: Move the API_ENDPOINT to a configuration file
  const API_ENDPOINT = "https://us-central1-clarityapps-sandbox.cloudfunctions.net/lockers/";

  const Axios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      "Content-Type": "text/plain"
    },
    maxContentLength: 1048487,
    onDownloadProgress: progress.update,
    onUploadProgress: progress.update
  });

  const get = function (id) {
    return Axios
      .get("fetch/" + id)
      .then(function (response) {
        let locker = response.data;
        locker.data = Base64.decode(locker.data);

        try {
          locker.data = JSON.parse(locker.data);
        } catch (e) {
          // Nothing needs to happen here.
          // console.log("Data is not a valid JSON string.");
        }

        return locker;
      })
      .catch(function (e) {
        throwApiError(e);
      });
  }

  const store = function (data) {
    try {
      data = JSON.stringify(JSON.parse(data));
    } catch (e) {
      // Nothing needs to happen here.
      // console.log("Data is not a valid JSON string.");
    }

    let base64Data = Base64.encode(data);

    return Axios.post("yield", base64Data)
      .then(function(response) {
        return response.data.id;
      })
      .catch(function(e) {
        throwApiError(e);
      });
  }

  const throwApiError = function (e) {
    progress.clear();

    let error = {
      name: "Error",
      message: "An unknown error occured."
    };

    if (e.response) {
      error.name = "Error " + e.response.status;
      error.message = e.response.data.message;
    } else if (e.request) {
      error.name = "Error " + e.request.status;
      error.message = e.request.data.message;
    } else {
      error.message = e.message;
    }

    let apiError = new Error(error.message);
    apiError.name = error.name;

    throw apiError;
  }

  return {
    "get": get,
    "store": store
  };
})(axios, ProgressService);