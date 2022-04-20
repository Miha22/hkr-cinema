const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const config = require("./package.json");
const file1 = 'seats.js';
const file2 = 'film-script.js';

module.exports = {
    mode: 'development',
    entry: {
        'bundle-seats': path.resolve(__dirname, './scripts/', file1),
        'bundle-film-script': path.resolve(__dirname, './scripts/', file2)
    },
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, './public/scripts/'),
      filename: '[name].js'
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //       template: path.join(__dirname, "src", "index.html"),
    //     }),
    // ],
    module: {
        rules: [
            {
              test: /\.?js$/,///\.jsx?$/
              exclude: /(node_modules)/,
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