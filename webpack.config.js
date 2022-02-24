const path = require("path");
//const config = require("./package.json");
const file1 = 'some-script.js';

module.exports = {
    mode: 'development',
    entry: [
        path.resolve(__dirname, './scripts/', file1),
        //path.resolve(__dirname, './scripts/', file2)
    ],
    devtool: "source-map",
    output: {
        path: __dirname,
        filename: `./public/bundle-${file1}`
    }
};