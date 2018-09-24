import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Component from '../dist/bundle.min';

const App = () => (
    <div>
        This is the sandbox app to test your npm module.
        <Component />
    </div>
);

/** HMR */
hot(module)(App);

ReactDOM.render(<App />, document.getElementById('app'));
