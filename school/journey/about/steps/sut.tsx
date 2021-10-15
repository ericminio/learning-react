import React from 'react';
import { MemoryRouter, Switch, Route } from "react-router-dom";

import { render } from '@testing-library/react';

import { One } from '../../app/one';
import { Two } from '../../app/two';

function Sut() {
    return (
        <Switch>
            <Route path="/one">
                <One then="/two"/>
            </Route>
            <Route path="/two">
                <Two />
            </Route>
        </Switch>
    )
}

export function onceUponATime() {
    render(
        <MemoryRouter initialEntries={[ "/one" ]}>
            <Sut />
        </MemoryRouter>
    );
}
