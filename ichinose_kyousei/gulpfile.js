/**
 * gulpの各taskを読み込んで実行します
 */

const requireDir = require("require-dir");
requireDir("./gulp/task/", { recurse: true });