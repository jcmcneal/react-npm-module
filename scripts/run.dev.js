#!/usr/bin/env node

const { exec } = require('child_process');

/** Output Helper */
function logger(child) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('exit', code => console.log(`Script exited with code ${code}`));
}

// Start Component Webpack
const component = exec('yarn dev');
logger(component);

// Start Dev App
const app = exec('yarn app:dev');
logger(app);
