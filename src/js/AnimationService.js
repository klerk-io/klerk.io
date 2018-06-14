const AnimationService = (function () {
  const animate = function (ele, name) {
    const animationClass = "animate-" + name;

    ele.classList.add(animationClass);
    ele.addEventListener("animationend", function (event) {
      event.target.classList.remove(animationClass);
    });
  }

  const pop = function (ele) {
    animate(ele, "pop");
  }

  const toggleButton = function (button, appendix = "ing …", text = null) {
    button.disabled = !button.disabled;
    text = text || button.innerHTML;

    if (button.disabled) {
      button.innerHTML = text + appendix;
    } else {
      button.innerHTML = text.replace(appendix, "");
    }
  }

  const writeButton = function (button, text) {
    button.innerHTML = text;
  }

  return {
    animate: animate,
    pop: pop,
    toggleButton: toggleButton,
    writeButton: writeButton
  }
})();