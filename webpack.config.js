const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";
  const rootDir = path.resolve(__dirname);

  let cssLoaders, jsLoaders, justApp1Chunk, bothAppsChunk;
  return {
    entry: {
      [(justApp1Chunk = "just-app-1")]: "./src/just-app-1.js",
      [(bothAppsChunk = "both-apps")]: "./src/both-apps.js"
    },
    output: {
      path: path.resolve(rootDir, "dist"),
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      publicPath: ""
    },
    optimization: {
      splitChunks: {
        chunks: isDev ? "async" : "all"
      }
    },
    devServer: {
      contentBase: path.resolve(rootDir, "dist"),
      index: "index.html",
      port: 9999
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: ["handlebars-loader"]
        },
        {
          test: /\.css$/,
          loader: (cssLoaders = [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-modules-typescript-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: isDev
                    ? "[path][local]__[hash:base64:5]"
                    : "[hash:base64]"
                }
              }
            }
          ])
        },
        {
          test: /\.scss$/,
          loader: cssLoaders.concat("sass-loader")
        },
        {
          test: /\.jsx?$/,
          loader: (jsLoaders = [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          ])
        },
        {
          test: /\.tsx?/,
          loader: jsLoaders.concat("ts-loader")
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "both-apps.html",
        chunks: [bothAppsChunk, "vendors~both-apps~just-app-1"],
        template: path.resolve(rootDir, "src/html-template.hbs"),
        title: "Hello World!"
      }),
      new HtmlWebpackPlugin({
        filename: "just-app-1.html",
        chunks: [justApp1Chunk, "vendors~both-apps~just-app-1"],
        template: path.resolve(rootDir, "src/html-template.hbs"),
        title: "Hello World!"
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? "[name].css" : "[name].[contenthash].css"
      }),
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
  };
};
