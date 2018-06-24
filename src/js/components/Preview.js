import AnimationService from "../services/AnimationService";
const animate = new AnimationService();

import "../vendors/Prism";

export default class Preview {
  constructor(selector = "#preview") {
    this._preview = document.querySelector(selector);
    this._preset = this._preview.innerText;
    this._media = null;
    this._viewer = this._preview.querySelector(".media");
  }

  setJson(content) {
    return this.setCode(content, "json");
  };

  setMarkdown(content) {
    return this.setCode(content, "markdown");
  }

  setCode(content, format) {
    const code = this._preview.querySelector(".code");
    code.innerHTML = Prism.highlight(content, Prism.languages[format], format);

    animate.pop(this._preview);

    return this;
  }

  resetCode() {
    return this.setMarkdown(this._preset);
  }

  setMedia(data) {
    this._media = this.createElement(data);
    return this;
  };

  resetMedia() {
    this.closeViewer();

    this._viewer.innerHTML = "";

    return this;
  };

  createElement(data) {
    let element;

    if (data.indexOf("data:video/") !== -1) {
      element = document.createElement("video");
      element.src = data;
      element.autoplay = true;
      element.controls = true;
      element.loop = true;
    } else if (data.indexOf("data:image/") !== -1) {
      element = document.createElement("img");
      element.src = data;
    } else if (
      data.indexOf("data:text/html") !== -1
      || data.indexOf("data:application/pdf") !== -1
    ) {
      element = document.createElement("iframe");
      element.src = data;
    } else if (
      data.indexOf("data:text/") !== -1
      || data.indexOf("data:application/") !== -1
    ) {
      let code = document.createElement("code");
      code.innerText = Base64.decode(data);

      element = document.createElement("pre");
      element.appendChild(code);
    } else {
      element = document.createElement("iframe");
      element.src = data;
    }

    return element;
  }

  openViewer(data = null) {
    if (data) {
      this.setMedia(data);
    }

    this._viewer.innerHTML = "";
    this._viewer.appendChild(this._media);
    this._viewer.classList.add("active");

    this._viewer.addEventListener("click", e => {
      e.preventDefault();
      this.closeViewer();
    });

    animate.pop(this._viewer);

    return this;
  }

  closeViewer() {
    this._viewer.classList.remove("active");
    return this;
  }

  reset() {
    return this
      .resetCode()
      .resetMedia();
  }
}