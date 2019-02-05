// "dev": "webpack --watch --mode=development",
// "build": "export NODE_ENV=production; webpack --progress --optimize-minimize --mode=production",
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const args = require('minimist')(process.argv);
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const app = require('./package.json');

// const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: path.basename(app.main),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src/index.js'),
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    /** Don't bundle common dependencies */
    externals: [
        'deep-get-set',
        /overstock-component-library/,
        'object-assign',
        'prop-types',
        'query-string',
        'react',
        'reselect',
    ],
    node: {
        Buffer: false,
    },
    optimization: {
        minimizer: [
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
        ],
    },
    plugins: [],
    stats: {
        builtAt: false,
        hash: false,
        modules: false,
        version: false,
        warnings: false,
    },
};

// Analyze bundle with --analyze flag
if (args.analyze) config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
