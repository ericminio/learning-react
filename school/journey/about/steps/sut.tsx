import React from 'react';
import { Switch, Route } from "react-router-dom";

import { One } from '../../app/one';
import { Two } from '../../app/two';

export function Sut() {
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