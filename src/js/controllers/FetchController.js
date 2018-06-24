import LockerService from "../services/LockerService";

export default class FetchController {
  constructor(form, preview, flash, progress) {
    this._flash = flash;
    this._preview = preview;
    this._locker = new LockerService(progress);

    this._form = form;
    this._form.onSubmit(this.fetchLocker, this._form, this._locker, this._preview, this._flash);
  }

  fetchLocker(event, form, locker, preview, flash) {
    event.preventDefault();

    const id = form.getValue("id");

    if (!id) {
      flash.set("Please paste a Locker ID.", "Form Error");
      return;
    }

    form.toggleSubmitButton();

    locker
      .get(id)
      .then(locker => {
        // Preview JSON
        preview.setJson(JSON.stringify(locker, null, 2));

        // Preview Data
        if (typeof locker.data !== "object" && locker.data.indexOf("data:") !== -1) {
          preview.openViewer(locker.data);
        }
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