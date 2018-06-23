import AnimationService from "../services/AnimationService";
const animate = new AnimationService();

import "../vendors/Prism";

export default class Preview {
  constructor(selector = "#preview") {
    this._preview = document.querySelector(selector);
    this._preset = this._preview.innerText;
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
    // Build media element for mime-type
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
    } else if (data.indexOf("data:text/html") !== -1) {
      element = document.createElement("iframe");
      element.src = data;
    } else if (data.indexOf("data:application/pdf") !== -1) {
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

    // Insert media element in preview container
    const media = this._preview.querySelector(".media");
    media.innerHTML = "";
    media.appendChild(element);

    animate.pop(media)

    return this;
  };

  resetMedia() {
    const media = this._preview.querySelector(".media");
    media.innerHTML = "";

    return this;
  };

  reset() {
    return this
      .resetCode()
      .resetMedia();
  }
}