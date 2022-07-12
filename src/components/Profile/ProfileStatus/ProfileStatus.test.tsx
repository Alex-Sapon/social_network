import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from './ProfileStatus';
import {Provider} from 'react-redux';
import {store} from '../../../redux/redux-store';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<Provider store={store}>
            <ProfileStatus status='Status of profile' />
        </Provider>);
        const instance = component.root.findByType('span');
        expect(instance).toBe(1);
    });
});