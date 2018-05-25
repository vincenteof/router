const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  mode: PROD ? "production" : "development",
  devtool: PROD ? "source-map" : "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  },
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Reach Router: Next Generation Routing for React",
      template: "src/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      Glamor: "glamor/react"
    })
  ].concat(
    PROD ? [new UglifyJSPlugin()] : [new webpack.HotModuleReplacementPlugin()]
  ),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.md$/,
        use: path.resolve("build/markdown-loader.js")
      }
    ]
  }
};
