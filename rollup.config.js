// "dev": "rollup --config rollup.config.js --watch",
// "build": "rollup --config rollup.config.js --environment NODE_ENV:production",
import path from 'path';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

import app from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.js',
    output: {
        file: `./dist/${path.basename(app.main)}`,
        format: 'umd',
        name: 'overstock',
    },
    external: [],
    context: 'this',
    plugins: [
        isProd && eslint({
            throwOnError: true,
            throwOnWarning: true,
            exclude: ['node_modules/**', '**/**/*.less'],
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        isProd && uglify(),
        filesize(),
    ],
};
