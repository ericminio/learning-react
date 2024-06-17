import * as React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Router', () => {
    it('selects the first matching route', () => {
        render(
            <MemoryRouter initialEntries={['/page']}>
                <Routes>
                    <Route path="/" element={<div>home</div>}></Route>
                    <Route path="/page" element={<div>page</div>}></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/page/)).toBeInTheDocument();
        expect(screen.queryByText(/home/)).not.toBeInTheDocument();
    });

    it('explore', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<div>home</div>}></Route>
                    <Route path="/page" element={<div>page</div>}></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText(/page/)).not.toBeInTheDocument();
        expect(screen.queryByText(/home/)).toBeInTheDocument();
    });
});
