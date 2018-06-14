const path = require("path");
const del = require("del");

const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const paths = {
  source: "src",
  dist: "dist",
  scss: "scss/main.scss",
  js: "js/**/*.js",
  img: "img/**/*",
  html: "**/*.html"
};

gulp.task("clean", () => { del(paths.dist); });

gulp.task("sass", () => {
  return gulp
    .src(path.join(paths.source, paths.scss))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.join(paths.dist, "css")));
});

gulp.task("sass:watch", () => {
  gulp.watch(path.join(paths.source, paths.scss), ["sass"]);
});

gulp.task("javascript", function () {
  return gulp
      .src([
        // The order matters! This needs to be re-tooled. Webpack?
        "node_modules/axios/dist/axios.js",
        "node_modules/base64-js/base64js.min.js",
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "src/js/Base64.js",
        "src/js/Prism.js",
        "src/js/AnimationService.js",
        "src/js/ProgressService.js",
        "src/js/FlashService.js",
        "src/js/FileService.js",
        "src/js/LockerService.js",
        "src/js/FormController.js",
        "src/js/URLController.js",
        "src/js/main.js"
      ])
      .pipe(sourcemaps.init())
      .pipe(concat("bundle.js"))
      // .pipe(uglify())
      // .pipe(rename("main.min.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(path.join(paths.dist, "js")));
});

gulp.task("javascript:watch", () => {
  gulp.watch(path.join(paths.source, paths.js), ["javascript"]);
});

gulp.task("images", () => {
  return gulp
    .src(path.join(paths.source, paths.img))
    .pipe(gulp.dest(path.join(paths.dist, "img")));
});

gulp.task("html", () => {
  return gulp
  .src(path.join(paths.source, paths.html))
  .pipe(gulp.dest(paths.dist));
});

gulp.task("build", ["sass", "javascript", "images", "html"]);

gulp.task("build:watch", () => {
  gulp.watch([
    path.join(paths.source, paths.scss),
    path.join(paths.source, paths.js),
    path.join(paths.source, paths.html)
  ], ["build"]);
});