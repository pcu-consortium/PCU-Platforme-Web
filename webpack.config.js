// webpack.config.js
var webpack = require("webpack");
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var appModulesPath = path.resolve(__dirname, 'src');

//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToSummernote = path.resolve(nodeModulesPath, 'summernote/dist/summernote.js');

var isDevEnv = (process.env.NODE_ENV == 'development');
var packEntries = function(entries){
    if (!Array.isArray(entries)){
        entries = [entries];
    }
    if (isDevEnv){
        return entries.concat([
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server'
        ]);
    } else {
        return entries;
    }
};

var babelLoader = 'babel-loader?stage=1&optional=runtime';

var plugins = [
    new webpack.DefinePlugin({ // Required for summernote import
        "require.specified": "require.resolve"
    }),
    new webpack.ProvidePlugin({ // Plugins to auto-load without require :)
        React: "react",
        classNames: 'classnames'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.PrefetchPlugin("react-bootstrap"),
    new webpack.PrefetchPlugin("react-router"),
];
if (isDevEnv){
    plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    plugins.push(new webpack.DefinePlugin({ 
        "process.env": {NODE_ENV: '"production"'}
    }));
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js",
    //minChunks: Infinity // (this ensures that no other module goes into the vendor chunk)
}));

var config = {
    context: appModulesPath,
    entry: {
        'admin': packEntries('./admin/admin.jsx'),
        'cms': packEntries('./apps/cms/cms-app.jsx'),
        'login': packEntries('./apps/login/app.jsx'),
        'search': packEntries('./apps/search/app.jsx'),
        'video-analysis': packEntries('./apps/video-analysis/app.jsx'),
        'widgets': packEntries('./widgets/widgets.jsx'),
        'vendor': packEntries([
            './utils/compat.jsx', 'react', 'react/addons', 'react-dom',
            'react-bootstrap', 'react-router', 
            'classnames', //'react-grid-layout', 
            'lodash/collection', 'lodash/lang', 'lodash/object'
        ])
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    appModulesPath
                ],
                loaders: (isDevEnv ? ['react-hot', babelLoader] : [babelLoader])
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
    },
    plugins: plugins,
    resolve: {
        root: [appModulesPath, nodeModulesPath],
        alias: {
            summernote: pathToSummernote
        },
        extensions: ['', '.js', '.jsx', '.json']
    },
    externals: {
        "jquery": "jQuery",
        "CodeMirror": "CodeMirror",
        "moment": "moment" // Loading moment from "outside" to avoid bundling all the locales
    },
    devtool: "inline-source-map"
};

module.exports = config;