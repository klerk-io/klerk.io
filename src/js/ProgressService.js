const ProgressService = (function () {
  let progress = document.getElementById("progress");
  let bar = progress.children[0];

  const set = function (percent) {
    progress.style.display = "block";
    bar.style.width = percent + "%";
    bar.setAttribute("aria-valuenow", percent);
  }

  const clear = function () {
    progress.style.display = "none";
    bar.style.width = "0%";
    bar.setAttribute("aria-valuenow", 0);
  }

  const update = function (event) {
    let percent = Math.ceil((event.loaded / event.total) * 100);

    if (percent < 99) {
      set(percent);
    } else {
      clear();
    }
  };

  return {
    set: set,
    clear: clear,
    update: update
  }
})();