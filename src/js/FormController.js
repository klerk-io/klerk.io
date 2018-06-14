let FormController = (function (animate, flash, lockers, prism) {
  let lockerPreviewIntro = "";

  const init = function () {
    const preview = document.querySelector("#lockerPreview code");
    lockerPreviewIntro = preview.innerText;

    attachFormSubmitListener("storeLocker", storeLocker);
    attachFormSubmitListener("fetchLocker", fetchLocker);
  }

  const attachFormSubmitListener = function (id, handler) {
    const form = document.getElementById(id);
    form.addEventListener("submit", handler);
  }

  const storeLocker = function (event) {
    event.preventDefault();

    const form = this;
    const data = form.querySelector('[name="data"]').value;
    const submitButton = form.querySelector('[type="submit"]');

    if (!data) {
      flash.set("Please insert some data.", "Form Error");
      return;
    }

    animate.toggleButton(submitButton);

    lockers.store(data)
      .then(function (id) {
        populateInput(id);
      })
      .catch(function (e) {
        console.error(e);
        resetJSONPreview();
        flash.set(e.message, e.name);
      })
      .finally(function () {
        animate.toggleButton(submitButton);
      });
  }

  const fetchLocker = function (event) {
    event.preventDefault();

    const form = this;
    const id = form.querySelector('[name="id"]').value;
    const submitButton = form.querySelector('[type="submit"]');

    if (!id) {
      flash.set("Please paste a Locker ID.", "Form Error");
      return;
    }

    animate.toggleButton(submitButton);

    lockers.get(id)
      .then(function (locker) {
        // Preview JSON
        const lockerString = JSON.stringify(locker, null, 2);
        populateJSONPreview(lockerString, "json");

        // Preview Data
        if (typeof locker.data !== "object" && locker.data.indexOf("data:") !== -1) {
          populateMediaPreview(locker.data);
        }
      })
      .catch(function (e) {
        console.error(e);
        resetJSONPreview();
        flash.set(e.message, e.name);
      })
      .finally(function () {
        animate.toggleButton(submitButton);
      });
  }

  const populateInput = function(id) {
    const form = document.querySelector("#fetchLocker");
    const input = form.querySelector('[name="id"]');

    input.value = id;

    animate.pop(input.parentElement);
  };

  const populateJSONPreview = function (lockerString, format = "markdown") {
    const code = document.querySelector("#lockerPreview > pre > code");
    code.innerHTML = prism.highlight(lockerString, prism.languages[format], format);

    const lockerPreview = document.querySelector("#lockerPreview");
    animate.pop(lockerPreview);
  };

  const resetJSONPreview = function() {
    populateInput("");
    populateJSONPreview(lockerPreviewIntro);
    resetMediaPreview();
  };

  const populateMediaPreview = function(data) {
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

    const mediaPreview = document.getElementById("mediaPreview");
    mediaPreview.innerHTML = "";
    mediaPreview.appendChild(element);
  };

  const resetMediaPreview = function() {
    const mediaPreview = document.getElementById("mediaPreview");
    mediaPreview.innerHTML = "";
  };

  return {
    init: init,
    populateInput: populateInput
  };
})(AnimationService, FlashService, LockerService, Prism);