import React from 'react';
import { MemoryRouter, Switch, Route } from "react-router-dom";

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { One, Two } from '../sut';

export function givenWeOpenThePage(pathname) {
    render(
        <MemoryRouter initialEntries={[ pathname ]}>
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
export function givenWeOpenTheFirstPage() {
    givenWeOpenThePage("/one");
}
export function whenWeContinueToNextPage() {
    userEvent.click(screen.getByRole('button', { name:'go' }));
}
export function thenWeSeeTheFirstPage() {
    expect(screen.getByText(/go/)).toBeInTheDocument();
}
export function thenWeSeeTheSecondPage() {
    expect(screen.getByText(/landed/)).toBeInTheDocument();
}