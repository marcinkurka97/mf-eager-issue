const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index",
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3003,
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.terserMinify,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
