import { } from "bootstrap";

import Flash from "./components/Flash";
import Form from "./components/Form";
import Preview from "./components/Preview";
import Progress from "./components/Progress";

import FetchController from "./controllers/FetchController";
import RawController from "./controllers/RawController";
import UrlController from "./controllers/UrlController";

let flash = new Flash();
let progress = new Progress();
let preview = new Preview();

// Let's start the controllers
// when the page finished loading.
window.onload = function() {
  let fetchForm = new Form("#fetchLocker");
  let rawForm = new Form("#storeLocker");
  let urlForm = new Form("#urlLocker");

  let fetchController = new FetchController(fetchForm, preview, flash, progress);
  let rawController = new RawController(rawForm, fetchForm, preview, flash, progress);
  let urlController = new UrlController(urlForm, fetchForm, preview, flash, progress);

  // console.log(fetchController, rawController, urlController);
}