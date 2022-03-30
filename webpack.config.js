const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const config = require("./package.json");
const file1 = 'hello.js';
const file2 = 'film-script.js';

module.exports = {
    mode: 'development',
    entry: [
        path.resolve(__dirname, './scripts/', file2),
        //path.resolve(__dirname, './scripts/', file2)
    ],
    devtool: "source-map",
    output: {
        path: __dirname,
        filename: `./public/scripts/bundle-${file2}`
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //       template: path.join(__dirname, "src", "index.html"),
    //     }),
    // ],
    module: {
        rules: [
            {
              test: /\.?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            },
          ]
    }
};