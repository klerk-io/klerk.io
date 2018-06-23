import FileService from "../services/FileService";
import LockerService from "../services/LockerService";

export default class UrlController {
  constructor(form, fetch, preview, flash, progress) {
    this._flash = flash;
    this._preview = preview;
    this._fetch = fetch;
    this._file = new FileService(progress);
    this._locker = new LockerService(progress);

    this._form = form;
    this._form.onSubmit(this.storeUrl, this._form, this._locker, this._preview, this._flash, this._fetch, this._file);
  }

  storeUrl(event, form, locker, preview, flash, fetch, file) {
    event.preventDefault();

    const url = form.getValue("url");

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
      flash.set("Not a valid URL. Try again!", "URL Error");
      return;
    }

    form.toggleSubmitButton();

    file
      .get(url)
      .then(data => {
        return locker.store(data);
      })
      .then(id => {
        fetch.setValue("id", id);
      })
      .catch(e => {
        preview.reset();
        flash.set(e.message, e.name);
      })
      .finally(() => {
        form.toggleSubmitButton(undefined, "", "send");
      });
  }
}