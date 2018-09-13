import React from 'react';
import ReactDOM from 'react-dom';

import Component from '../dist/bundle.min';

const App = () => (
    <div>
        My App!
        <Component />
    </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
