/**
 * タスク名を指定せずにgulp起動した場合に実行されます
 */

const gulp = require("gulp");
const config = require("../config");
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("default", () => {
    return $.sequence(["scss", "script", "php", "copy", "serve", "disconnect"]);
});