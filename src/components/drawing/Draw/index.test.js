import React, { useRef } from 'react'
import { cleanup } from '@testing-library/react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Draw from './index.js';
import fakeImage from './../../../assets/drawing-sample.png';

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
    const wrapper = shallow(<Draw stage={fakeImage} onComplete={false} />);
    expect(wrapper).toMatchSnapshot();
})
