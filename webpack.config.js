const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');


module.exports = (env) => {

  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  console.log(envKeys);

  return {
    entry: [
      path.join(__dirname, "src", "index.js"),
    ],
    output: {
      path: path.join(__dirname, "/dist"), // the bundle output path
      filename: "bundle.js", // the name of the bundle
      library: 'CredApp',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"), // to import index.html file inside index.js
      }),
      // fix "process is not defined" error:
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    devServer: {
      port: 3030, // you can change the port
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
  }
};