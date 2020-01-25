/**
 * gulp環境変数
 */
module.exports.setting = {
    html: {

        // phpからhtmlファイルを出力するかどうか / 標準は true
        output: true,

        //htmlファイルの出力先
        dest: "html/",

        //assetsの中身をhtml出力先にコピーするかどうか / 標準はtrue
        copy_assets: true,

        //コピーするassetsディレクトリの場所（コピー元）
        copy_assets_dir: "root/assets",

        //コピーするassetsディレクトリの中身（コピー元の中身のうち、どれをコピーするか）
        copy_aseets_files: [
            "root/assets/css/**/*.*",
            "root/assets/img/**/*.*",
            "root/assets/js/**/*.*"
        ],

        //コピー先のディレクトリ
        copy_aseets_dest: "html/assets"

    },
    css: {

        // SCSSから出力されたCSSを圧縮するかどうか / 標準は false
        minify: false,

        // 出力されたCSSのファイル名に .min をつけるかどうか / 標準は false
        rename_min: false,

        // Mapファイルを出力するかどうか / 標準は false
        map: false,

        // CSSの出力をSCSSのディレクトリ通りにするかどうか / 標準は true
        // trueなら、例えば scss/aaa/test.scss は assets/css/aaa/test.css 出力される
        directory: true,

        // SCSSファイルの場所
        src: "dev/scss/",

        // CSSの出力先
        dest: "root/assets/css/"

    },

    js: {

        // webpackを使って、jsファイルをbundleするかどうか / 標準は false
        webpack: false,

        // jsファイルを圧縮するかどうか / 標準は false
        minify: false,

        // 出力されたjsのファイル名に .min をつけるかどうか / 標準は false
        rename_min: false,

        // ES6で書かれたjsをES5に変換するかどうか / 標準は false
        babel: false,

        // 変換前のjsファイルの場所
        src: "dev/js/",

        // jsの出力先
        dest: "root/assets/js/"

    },
    image: {

        // gulpで画像の圧縮が行えます
        // gulp imagemin で実行できます
        // 圧縮前の画像に戻すことはできませんので、圧縮前の画像はバックアップを取ってください

        // 圧縮したい画像のある場所
        path: "root/assets/img/",

        // 画質
        quality: "80-90"

    },
    server: {

        // rootディレクトリ
        base: "root",
        watch: "./root"

    }
};

/**
 * ロードモジュールの設定
 */
module.exports.loadPlugins = {
    pattern: [
        "gulp-*",
        "gulp.*",
        "browser-sync",
        "run-sequence",
        "imagemin-pngquant",
        "imagemin-jpegtran",
        "node-sass-package-importer"
    ],
    rename: {
        "browser-sync": "browserSync",
        "run-sequence": "sequence",
        "imagemin-pngquant": "pngquant",
        "imagemin-jpegtran": "jpegtran",
        "gulp-connect-php": "php",
        "gulp-clean-css": "cleanCSS",
        "node-sass-package-importer": "sassImporter"
    }
};