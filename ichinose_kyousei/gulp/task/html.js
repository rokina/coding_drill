/**
 * HTMLファイルを更新するとブラウザをリロードします。
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("html", () => {
    return gulp
        .src(setting.server.base + "/**/*.html")
        .pipe($.browserSync.stream());
});