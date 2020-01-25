/**
 * jsファイルをコンパイルします
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

gulp.task("script", () => {
    if (setting.js.webpack) {
        const webpack = require("webpack");
        const webpackStream = require("webpack-stream");
        const webpackConfig = require("../../webpack.config");
        gulp.src([setting.js.src + "**/*.js"])
            .pipe(
                $.plumber({
                    errorHandler: $.notify.onError("Error: <%= error %>")
                })
            )
            .pipe(new webpackStream(webpackConfig, webpack))
            .pipe(gulp.dest(setting.js.dest))
            .pipe($.browserSync.reload({ stream: true }));
    } else {
        gulp.src([setting.js.src + "**/*.js"])
            .pipe(
                $.plumber({
                    errorHandler: $.notify.onError("Error: <%= error %>")
                })
            )
            .pipe($.if(setting.js.babel, $.babel()))
            .pipe($.if(setting.js.minify, $.uglify()))
            .pipe($.if(setting.js.rename_min, $.rename({ suffix: ".min" })))
            .pipe(gulp.dest(setting.js.dest))
            .pipe($.browserSync.reload({ stream: true }));
    }
});