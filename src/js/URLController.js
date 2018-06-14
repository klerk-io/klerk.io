const URLController = (function (animate, file, flash, lockers) {
  const init = function () {
    attachFormSubmitListener("storeUrl", storeUrl);
  }

  const attachFormSubmitListener = function(id, handler) {
    const form = document.getElementById(id);
    form.addEventListener("submit", handler);
  };

  const storeUrl = function (event) {
    event.preventDefault();

    const form = this;
    const url = form.querySelector('[name="url"]').value;
    const submitButton = form.querySelector('[type="submit"]');
    let dots = "";

    if (!isUrl(url)) {
      flash.set("Not a valid URL. Try again!", "URL Error");
      return;
    }

    animate.toggleButton(submitButton);

    file
      .get(url)
      .then(function (data) {
        return lockers.store(data);
      })
      .then(function (id) {
        // @todo: This needs to be refactored
        FormController.populateInput(id);
      })
      .catch(function (e) {
        flash.set(e.message, e.name);
      })
      .finally(function () {
        animate.toggleButton(submitButton, "", "send");
      });
  }

  const isUrl = function (string) {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(string);
  }

  return {
    init: init
  }
})(AnimationService, FileService, FlashService, LockerService);