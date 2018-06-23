export default class Flash {
  constructor(selector = "#flash") {
    this._flash = document.querySelector(selector);
  }

  set(message, title, level) {
    this.clear();
    this._flash.innerHTML = this.createAlert(message, title, level);
  }

  add(message, title, level) {
    this._flash.innerHTML = this._flash.innerHTML + this.createAlert(message, title, level);
  }

  clear() {
    this._flash.innerHTML = "";
  }

  createAlert(message, title, level = "danger") {
    let template = '<div class="alert alert-{{level}} alert-dismissible fade show" role="alert">{{title}}{{message}}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

    return template
      .replace("{{level}}", level)
      .replace("{{title}}", (title ? '<strong class="alert-heading">' + title + '</strong> ' : ""))
      .replace("{{message}}", message);
  }
}