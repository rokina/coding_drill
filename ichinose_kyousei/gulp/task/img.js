/**
 * config.imagemin.path配下の画像を圧縮します
 * gulp imagemin で実行できます
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("imagemin", () => {
    gulp.src(setting.imagemin.path + "**/*.jpg")
        .pipe($.imagemin([$.jpegtran()]))
        .pipe(gulp.dest(setting.imagemin.path));
    gulp.src(setting.imagemin.path + "**/*.png")
        .pipe(
            $.imagemin([
                $.pngquant({
                    quality: setting.imagemin.quality,
                    speed: 1,
                    floyd: 0
                }),
                $.imagemin.optipng()
            ])
        )
        .pipe(gulp.dest(setting.imagemin.path));
});