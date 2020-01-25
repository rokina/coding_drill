/**
 * PHPファイルからHTMLファイルを出力します
 * PHPファイルを更新するとブラウザをリロードします
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

const es = require("event-stream");
const fs = require("fs-extra");

gulp.task("php2html", () => {});

const logFile = function(es) {
    return es.map(function(file, cb) {
        //log(file.path);
        cb();
        const html = fs.readFileSync(file.path, { encoding: "utf-8" });
        const count = (html.match(/php/g) || []).length;

        if (count) {
            console.log("\n");
            console.log(
                "==================================================================================="
            );
            console.log("\n");
            console.log(
                `出力されたhtml [${file.path}] 内に \n.php を含む記述が [${count}つ] 見つかりました。\n\n.phpのままで大丈夫でしょうか・・？ リンクの変更漏れなどはないですか・・？ 確認してみてください`
            );
            console.log("\n");
            console.log(
                "==================================================================================="
            );
            console.log("\n");
        }
    });
};

gulp.task("php", () => {
    //htmlファイルの出力
    if (setting.html.output) {
        gulp
            .src([
                setting.server.base + "/**/*.php",
                "!" + setting.server.base + "/assets/include/**/*"
            ])
            .pipe($.php2html({ baseDir: "./" + setting.server.base }))
            .pipe(gulp.dest(setting.html.dest))
            .pipe(logFile(es));
    }

    //ブラウザリロード
    gulp.src(setting.server.base + "/**/*.php").pipe($.browserSync.stream());

    return;
});