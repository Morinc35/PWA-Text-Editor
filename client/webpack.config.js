const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        name: "Jate",
        short_name: "J.A.T.E",
        description: "An easy to use text editor!",
        start_url: "./",
        publicPath: "./",
        theme_color: "#e6dd36",
        background_color: "#d4d2d5",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128],
            destination: path.join("assets", "icons"),
          },
        ],

      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
              "@babel/plugin-proposal-object-rest-spread", 
              "@babel/plugin-transform-runtime"
              ]
            }
          }
        }
        
        
      ],
    },
  };
};
