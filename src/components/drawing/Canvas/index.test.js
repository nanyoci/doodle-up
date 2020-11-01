import React, { useRef } from 'react'
import { cleanup } from '@testing-library/react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Canvas from './index.js';

configure({ adapter: new Adapter() });

beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
    window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };
})

afterEach(() => {
    cleanup();
});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

it('should take a snapshot', async () => {
    const mRef = { current: { offsetWidth: 100 } };
    useRef.mockReturnValueOnce(mRef);
    const wrapper = shallow(<Canvas></Canvas>);
    expect(wrapper).toMatchSnapshot();
})
