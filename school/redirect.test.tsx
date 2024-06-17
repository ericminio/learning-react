import React, { useState, useEffect } from 'react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

describe('Redirect', () => {
    it('is available', () => {
        render(
            <MemoryRouter initialEntries={['/initial']}>
                <Routes>
                    <Route
                        path="/initial"
                        element={<Navigate to="/final" />}
                    ></Route>
                    <Route path="/final" element={<div>landed</div>}></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/landed/)).toBeInTheDocument();
    });

    it('can happen async', async () => {
        let Initial = () => {
            const [shouldRedirect, setShouldRedirect] = useState(false);
            useEffect(() => {
                setTimeout(() => {
                    setShouldRedirect(true);
                }, 150);
            });
            return (
                <>
                    {shouldRedirect && <Navigate to="/final" />}
                    <div>initial</div>
                </>
            );
        };
        let Final = () => {
            return <div>landed</div>;
        };
        render(
            <MemoryRouter initialEntries={['/initial']}>
                <Routes>
                    <Route path="/initial" element={<Initial />}></Route>
                    <Route path="/final" element={<Final />}></Route>
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/initial/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/landed/)).toBeInTheDocument();
        });
    });
});
