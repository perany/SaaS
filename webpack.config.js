var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeModulesDir = path.join(__dirname, '../node_modules');

//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var environment = "dev";

var plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin("../css/base.css"),
    //new webpack.optimize.OccurenceOrderPlugin(true)
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    //'transform-es3-member-expression-literals',
    //'transform-es3-property-literals'
    // "transform-runtime"
    //new webpack.optimize.AggressiveMergingPlugin({})
]

var entry = {
    main: path.resolve(__dirname, './app/main.js'),
    vendor: [ './app/libs/raphael.min', './app/utils/md5', './app/utils/base64']
}


var output = {
    publicPath:String('./' + environment+'/'),
    path: path.resolve(__dirname, './' + environment),
    //filename: '[chunkhash].bundle.js',
    filename: 'main.js',
    chunkFilename: "[name].min.js"
}
if (environment != 'dev') {
    output.chunkFilename = "bundle.[chunkhash].js"
}


module.exports = {
    plugins: plugins,
    //entry: path.resolve(__dirname, './js/main.js'),
    externals: {
        jquery: './app/libs/jquery.min',
        raphael:'./app/libs/raphael.min'
    },
    entry: entry,
    output: output,
    devtool:'#source-map',
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loaders: ['babel']
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.html$/,
            loader: "string"
        }]
    }
};
