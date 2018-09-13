const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/** Server Settings */
const server = {
    domain: 'localhost',
    index: 'index.html',
    path: 'app/dist/',
    port: 7777,
    protocol: 'http',
    root: 'app/',
};
const publicPath = `${server.protocol}://${server.domain}:${server.port}/${server.path}`;

/** Is Development */
const isDev = process.env.NODE_ENV !== 'production';

/** Webpack Config */
const webpack = require('../webpack.config');

webpack.entry = path.join(__dirname, 'App.js');
webpack.output = {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist'),
};
webpack.externals = undefined;

/** Development */
if (isDev) {
    webpack.output.publicPath = publicPath;
    webpack.devServer = {
        port: server.port,
        compress: true,
        index: server.index,
        overlay: {
            warnings: false,
            errors: true,
        },
        publicPath,
        openPage: server.root,
    };
    webpack.optimization = {
        minimize: false,
    };
} else {
    /** Prod */
    webpack.plugins = [
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                compress: {
                    warnings: false,
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                },
                output: {
                    comments: false,
                },
            },
        }),
    ];
}

/** Export */
module.exports = webpack;
