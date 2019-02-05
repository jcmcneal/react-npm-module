import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { sleep } from '../dist/bundle.min';

// drag
const ms = 2000;
console.log(`sleeping ${ms}ms`);
sleep(ms);

const App = () => (
    <div>
        This is the sandbox app to test your npm module.
    </div>
);

/** HMR */
hot(module)(App);

ReactDOM.render(<App />, document.getElementById('app'));
