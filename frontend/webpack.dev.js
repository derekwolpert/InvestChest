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
        proxy: { "/api": "http://localhost:3000" },
        compress: true,
        watchContentBase: true
    }
});