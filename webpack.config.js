var webpack = require("webpack");
var path = require("path");
var baseDir = process.cwd();
var srcDir = path.resolve(baseDir, 'src');
module.exports = function () {
  var extendConf = {
    plugins: [
      new webpack.ProvidePlugin({
        $: "zepto",
        'window.$': 'zepto',
        _: '_',
        'window._': '_'
      }),
    ],
    resolve: {
      alias: {
        'zepto': path.resolve(srcDir, 'scripts/libs/zepto.js'),
        '_': path.resolve(baseDir, 'node_modules/underscore/underscore.js')
      }
    },
    module: {
      rules: [

      ]
    }
  };
  return extendConf;
};