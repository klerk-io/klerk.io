import AnimationService from "../services/AnimationService";
const animate = new AnimationService();

export default class Form {
  constructor(selector) {
    if (!selector) {
      throw new Error("Required parameter 'selector' missing.");
    }

    this._form = document.querySelector(selector);
  }

  getValue(name) {
    if (!name) {
      throw new Error("Required parameter 'name' missing.");
    }

    return this._form.querySelector(`[name="${name}"]`).value || null;
  }

  setValue(name, value) {
    if (!name) {
      throw new Error("Required parameter 'name' missing.");
    }

    if (!value) {
      throw new Error("Required parameter 'value' missing.");
    }

    const input = this._form.querySelector(`[name="${name}"]`);
    input.value = value;

    animate.pop(input);

    return this;
  }

  onSubmit(callback, ...args) {
    return this._form.addEventListener("submit", (event) => {
      return callback(event, ...args);
    });
  }

  toggleSubmitButton(selector = "[type=\"submit\"]", appendix, text) {
    this.toggleButton(selector, appendix, text);
    return this;
  }

  toggleButton(selector, appendix = "ing …", text = null) {
    const button = this._form.querySelector(selector);

    if (!button) {
      throw new Error(`Button (${selector}) was not found.`);
    }

    button.disabled = !button.disabled;
    text = text || button.innerHTML;

    if (button.disabled) {
      button.innerHTML = text + appendix;
    } else {
      button.innerHTML = text.replace(appendix, "");
    }

    return this;
  }
}