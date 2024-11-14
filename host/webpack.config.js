const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const pkg = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
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
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        remote: "remote@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          // Uncomment me to see that `dist/input_mf.js` is built with eager React
          // eager: true,
          requiredVersion: pkg.dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        },
      },
    }),
    new webpack.container.ModuleFederationPlugin({
      name: "input_mf",
      filename: "input_mf.js",
      exposes: {
        "./Input": "./src/Input",
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
