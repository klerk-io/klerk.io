import axios from "axios";
import Base64 from "../vendors/Base64";

export default class LockerService {
  constructor(progress) {
    this._axios = axios.create({
      baseURL: process.env.LOCKERS_ENDPOINT,
      headers: {
        "Content-Type": "text/plain"
      },
      maxContentLength: process.env.MAX_BASE64_CONTENT_LENGTH,
      onDownloadProgress: progress.constructor.update,
      onUploadProgress: progress.constructor.update
    });

    this._progress = progress;
  }

  get(id) {
    return this._axios
      .get("fetch/" + id)
      .then(response => {
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
      .catch(e => {
        this._progress.constructor.clear();
        this.throwApiError(e);
      });
  }

  store(data) {
    try {
      data = JSON.stringify(JSON.parse(data));
    } catch (e) {
      // Nothing needs to happen here.
      // console.log("Data is not a valid JSON string.");
    }

    const base64Data = Base64.encode(data);
    const base64Size = base64Data.split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;

    if (base64Size > process.env.MAX_BASE64_CONTENT_LENGTH) {
      throw new Error(`The content is too big to store. (max ${process.env.MAX_RAW_CONTENT_LENGTH} byte)`);
      return;
    }

    return this._axios
      .post("yield", base64Data)
      .then(response => response.data.id)
      .catch(e => {
        this._progress.constructor.clear();
        this.throwApiError(e);
      });
  }

  throwApiError(error) {
    let content = {
      name: "Error",
      message: "An unknown error occured."
    };

    if (error.message) {
      content.message = error.message;
    } else if (error.response) {
      content.name = "Error " + error.response.status;
      content.message = error.response.data.message;
    } else if (error.request) {
      content.name = "Error " + error.request.status;
      content.message = error.request.data.message;
    }

    let apiError = new Error(content.message);
    apiError.name = content.name;

    throw apiError;
    return;
  }
}


