import React from 'react';
import Renderer from 'react-test-renderer';

import App from './index';

/** Helper Functions */
const render = jsx => Renderer.create(jsx);
const getInstance = (component) => {
    const wrapper = render(component);
    return wrapper.getInstance();
};
const getState = (component) => {
    const instance = getInstance(component);
    return instance ? instance.state : undefined;
};
const takeSnapshot = test => expect(test).toMatchSnapshot();
const getTreeSnapshot = component => takeSnapshot(render(component));
const testComponent = (component) => {
    getTreeSnapshot(component);

    const state = getState(component);
    if (state) takeSnapshot(state);

    return state;
};

/** Unit Tests */
describe('Component', () => {
    it('basic snapshot', () => {
        testComponent(<App />);
    });
});
