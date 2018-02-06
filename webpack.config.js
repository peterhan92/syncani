module.exports = {
  entry: "./dev/index.js",
  output: {
    path: __dirname + "/public/js",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader",
        ],
      },
    ],
  },
};