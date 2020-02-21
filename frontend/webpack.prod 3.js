const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "postcss.config.js"
                            }
                        }
                    },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    mode: "production"
});
