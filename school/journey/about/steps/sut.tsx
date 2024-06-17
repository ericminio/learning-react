import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { render } from '@testing-library/react';

import { One } from '../../app/one';
import { Two } from '../../app/two';

function Sut() {
    return (
        <Routes>
            <Route path="/one" element={<One then="/two" />}></Route>
            <Route path="/two" element={<Two />}></Route>
        </Routes>
    );
}

export function uponATime() {
    render(
        <MemoryRouter initialEntries={['/one']}>
            <Sut />
        </MemoryRouter>
    );
}
