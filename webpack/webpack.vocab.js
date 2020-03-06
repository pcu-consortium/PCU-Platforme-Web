// webpack.config.js
var webpack = require("webpack");
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, '../node_modules');
var appModulesPath = path.resolve(__dirname, '../src');

var isDevEnv = true;

var packEntries = function(entries){
    if (!Array.isArray(entries)){
        entries = [entries];
    }
    return entries;
};

var plugins = [
    new webpack.ProvidePlugin({ // Plugins to auto-load without require :)
        React: "react",
        classNames: 'classnames'
    }),
    new webpack.NoErrorsPlugin()
];
plugins.push(new webpack.optimize.OccurenceOrderPlugin());

var config = {
    context: appModulesPath,
    entry: {
        'vocab': packEntries('./export/vocab/export-vocab.jsx')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                //exclude: /node_modules/,
                include: [
                    appModulesPath
                ],
                loaders: ['babel-loader?stage=1&optional=runtime']
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.scss$/,
                loader: "style!css!sass?outputStyle=expanded"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=5000'
            }
        ]
        //noParse: [pathToReact]
    },
    plugins: plugins,
    resolve: {
        root: [appModulesPath, nodeModulesPath],
        extensions: ['', '.js', '.jsx', '.json']
    },
    externals: {
        "jquery": "jQuery",
        "moment": "moment" // Loading moment from "outside" to avoid bundling all the locales
    }
    // devtool: isDevEnv ? "cheap-module-eval-source-map" : undefined
};

module.exports = config;