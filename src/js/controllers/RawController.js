import LockerService from "../services/LockerService";

export default class RawController {
  constructor(form, fetch, preview, flash, progress) {
    this._flash = flash;
    this._preview = preview;
    this._locker = new LockerService(progress);
    this._fetch = fetch;

    this._form = form;
    this._form.onSubmit(this.storeLocker, this._form, this._locker, this._preview, this._flash, this._fetch);
  }

  storeLocker(event, form, locker, preview, flash, fetch) {
    event.preventDefault();

    const data = form.getValue("data");

    if (!data) {
      flash.set("Please insert some data.", "Form Error");
      return;
    }

    form.toggleSubmitButton();

    locker
      .store(data)
      .then(id => {
        fetch.setValue("id", id);
      })
      .catch(e => {
        preview.reset();
        flash.set(e.message, e.name);
      })
      .finally(() => {
        form.toggleSubmitButton();
      });
  }
}