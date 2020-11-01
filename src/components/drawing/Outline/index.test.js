import React from 'react'
import { cleanup } from '@testing-library/react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Outline from './index.js';
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

it('should take a snapshot', async () => {
    const wrapper = shallow(<Outline stage={fakeImage} />);
    expect(wrapper).toMatchSnapshot();
})
