import { } from "bootstrap";

import Flash from "./components/Flash";
import Form from "./components/Form";
import Preview from "./components/Preview";
import Progress from "./components/Progress";

import FetchController from "./controllers/FetchController";
import RawController from "./controllers/RawController";
import UrlController from "./controllers/UrlController";

// Let's start the controllers
// when the page finished loading.
window.onload = function() {
  let flash = new Flash();
  let progress = new Progress();
  let preview = new Preview();

  let fetchForm = new Form("#fetchLocker");
  let rawForm = new Form("#storeLocker");
  let urlForm = new Form("#urlLocker");

  new FetchController(fetchForm, preview, flash, progress);
  new RawController(rawForm, fetchForm, preview, flash, progress);
  new UrlController(urlForm, fetchForm, preview, flash, progress);
}