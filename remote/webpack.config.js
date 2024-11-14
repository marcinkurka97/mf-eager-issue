const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const pkg = require("./package.json");

module.exports = {
  entry: {},
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
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
    new webpack.container.ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        },
      },
    }),
  ],
};
