import React from 'react';
import { MemoryRouter, Switch, Route } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { One } from '../sut/one';
import { Two } from '../sut/two';

export function givenWeOpenTheFirstStep() {
    render(
        <MemoryRouter initialEntries={["/one"]}>
            <Switch>
                <Route path="/one">
                    <One then="/two"/>
                </Route>
                <Route path="/two">
                    <Two />
                </Route>
            </Switch>
        </MemoryRouter>
    );
}
export function whenWeContinueToNextStep() {
    userEvent.click(screen.getByRole('button', { name:'go' }));
}
export function thenWeSeeTheSecondStep() {
    expect(screen.getByText(/landed/)).toBeInTheDocument();
}