#!/usr/bin/env node

const { spawn } = require('child_process');

/** Output Helper */
function logger(child) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('exit', code => console.log(`Script exited with code ${code}`));
}

// Start Component Webpack
const component = spawn('yarn', ['dev']);
logger(component);

// Start Dev App
const app = spawn('yarn', ['app:dev']);
logger(app);
