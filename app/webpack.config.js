/**
 * Called with `yarn app:dev` || `yarn app:build`
 */
const path = require('path');
const webpack = require('../webpack.config');

/** Is Development */
const isDev = process.env.NODE_ENV !== 'production';

/** Webpack Config */
webpack.entry = path.join(__dirname, 'App.js');
webpack.output = {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist'),
};
webpack.externals = undefined;

/** Development */
if (isDev) {
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
        stats: webpack.stats,
    };
    webpack.optimization = {
        minimize: false,
    };
}

/** Export */
module.exports = webpack;
