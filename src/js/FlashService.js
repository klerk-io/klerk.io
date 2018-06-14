const FlashService = (function () {
  const CONTAINER_ID = "flashContainer";

  const set = function (message, title, level) {
    clear();

    let flashContainer = document.getElementById(CONTAINER_ID);
    flashContainer.innerHTML = createAlert(message, title, level);
  }

  const add = function (message, title, level) {
    let flashContainer = document.getElementById(CONTAINER_ID);
    flashContainer.innerHTML = flashContainer.innerHTML + createAlert(message, title, level);
  }

  const clear = function () {
    let flashContainer = document.getElementById(CONTAINER_ID);
    flashContainer.innerHTML = "";
  }

  const createAlert = function (message, title, level = "danger") {
    let template = '<div class="alert alert-{{level}} alert-dismissible fade show" role="alert">{{title}}{{message}}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

    return template
      .replace("{{level}}", level)
      .replace("{{title}}", (title ? '<strong class="alert-heading">' + title + '</strong> ' : ""))
      .replace("{{message}}", message);
  }

  return {
    set: set,
    add: add,
    clear: clear
  };
})();