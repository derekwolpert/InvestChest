const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    watch: true,
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/",
        compress: true,
        watchContentBase: true,
        hot: true
    }
});