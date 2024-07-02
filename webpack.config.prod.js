const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

class ReplaceLinkPlugin {
  constructor(links) {
    this.links = links; // Store the passed array of link names
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ReplaceLinkPlugin', (compilation, cb) => {
      // Iterate over all compiled assets,
      // filtering for .html files
      Object.keys(compilation.assets).forEach((filename) => {
        if (filename.endsWith('.html')) {
          let html = compilation.assets[filename].source().toString();
          // Perform the replacement for each link name
          this.links.forEach(link => {
            const regex = new RegExp(`href="/${link}\.html"`, 'g');
            html = html.replace(regex, `href="/${link}"`);
          });
          // Update the compilation asset with the modified HTML
          compilation.assets[filename] = {
            source: () => html,
            size: () => html.length,
          };
        }
      });
      cb();
    });
  }
}

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.json$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'privacy.html',
      template: './privacy.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'cookies.html',
      template: './cookies.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: './contact.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'services.html',
      template: './services.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'assets', to: 'assets' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
    new ReplaceLinkPlugin(["privacy", "cookies", "contact", "services"]),
  ],
});
