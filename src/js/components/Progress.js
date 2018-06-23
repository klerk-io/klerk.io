export default class Progress {
  static clear(selector = "#progress") {
    const progress = document.querySelector(selector);
    const bar = progress.children[0];

    progress.style.display = "none";
    bar.style.width = "0%";
    bar.setAttribute("aria-valuenow", 0);

    return 0;
  }

  static update(event, selector = "#progress") {
    const percentage = Math.ceil((event.loaded / event.total) * 100);
    const progress = document.querySelector(selector);
    const bar = progress.children[0];

    if (percentage < 99) {
      progress.style.display = "block";
      bar.style.width = percentage + "%";
      bar.setAttribute("aria-valuenow", percentage);
    } else {
      progress.style.display = "none";
      bar.style.width = "0%";
      bar.setAttribute("aria-valuenow", 0);
    }

    return percentage;
  };
};