/**
 * ローカルサーバーを立ち上げます
 * ファイル更新を監視します
 */

const gulp = require("gulp");
const config = require("../config");
const setting = config.setting;
const $ = require("gulp-load-plugins")(config.loadPlugins);

const net = require("net");
const co = require("co");

// port割り当て
const getPort = () => {
    return co(function*() {
        const server = net.createServer();
        let port = null;

        server.on("listening", () => {
            port = server.address().port;
            server.close();
        });

        return new Promise((resolve, reject) => {
            server.on("close", () => resolve(port));
            server.on("error", err => reject(err));
            server.listen(0, "127.0.0.1");
        });
    });
};

gulp.task("serve", () => {
    co(function*() {
        let port_php = yield getPort();
        $.php.server({
                port: port_php,
                base: setting.server.base
            },
            () => {
                $.browserSync({
                    url: "localhost",
                    port: 4000,
                    proxy: "localhost:" + port_php,
                    ui: false
                });
                console.log(
                    "=======================================================================" +
                    "\n" +
                    "開発用のPHP版は" +
                    "\n" +
                    "http://localhost:" +
                    port_php +
                    "\n" +
                    "or" +
                    "\n" +
                    "http://localhost:4000" +
                    "\n" +
                    "で確認できます" +
                    "\n" +
                    "======================================================================="
                );
            }
        );

        if (setting.html.output) {
            let port_html = yield getPort();

            $.php.server({
                    port: port_html,
                    base: setting.html.dest
                },
                () => {
                    $.browserSync.create().init({
                        url: "localhost",
                        port: 4100,
                        proxy: "localhost:" + port_html,
                        ui: false
                    });
                    console.log(
                        "-----------------------------------------------------------------------" +
                        "\n" +
                        "出力されたHTMLファイルは" +
                        "\n" +
                        "http://localhost:" +
                        port_html +
                        "\n" +
                        "or" +
                        "\n" +
                        "http://localhost:4100" +
                        "\n" +
                        "で確認できます" +
                        "\n" +
                        "-----------------------------------------------------------------------"
                    );
                }
            );
        }
    }).catch(err => console.error(err));

    // ファイル監視
    gulp.watch(setting.server.base + "/**/*.php", ["php"]);
    gulp.watch(setting.server.base + "/**/*.html", ["html"]);
    gulp.watch(setting.css.src + "**/*.scss", ["scss", "copy"]);
    gulp.watch(setting.js.src + "**/*.js", ["script", "copy"]);
    gulp.watch(setting.image.path + "**/*.*", ["copy"]);
});

gulp.task("disconnect", () => {
    $.php.closeServer();
});