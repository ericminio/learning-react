import React from 'react';
import { MemoryRouter } from "react-router-dom";

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sut } from './sut';

export function givenWeOpenThePage(pathname) {
    render(
        <MemoryRouter initialEntries={[ pathname ]}>
            <Sut />
        </MemoryRouter>
    );
}
export function givenWeOpenTheFirstPage() {
    givenWeOpenThePage("/one");
}

export function whenWeContinueToNextPage() {
    userEvent.click(screen.getByRole('button', { name:'go' }));
}