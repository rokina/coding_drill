/**
 * ディレクトリごとコピーします
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const del = require("del");
const $ = require("gulp-load-plugins")(config.loadPlugins);

// ファイル削除
gulp.task("clean", del.bind(null, [setting.html.copy_aseets_dest]));

// ファイルコピー
gulp.task("filecopy", function() {
    return gulp
        .src(setting.html.copy_aseets_files, {
            base: setting.html.copy_assets_dir
        })
        .pipe(gulp.dest(setting.html.copy_aseets_dest));
});

// assets内を削除 → ファイルコピー の順番で実行
gulp.task("copy", function(callback) {
    if (setting.html.copy_assets) {
        return $.sequence("clean", "filecopy", callback);
    }
});