import React, { useState } from 'react';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navigation', () => {
    it('is possible', async () => {
        function One() {
            const [next, setNext] = useState(false);

            return (
                <>
                    {next && <Navigate to="/two" />}
                    <button
                        onClick={() => {
                            setNext(true);
                        }}
                    >
                        go
                    </button>
                </>
            );
        }
        function Two() {
            return <div>landed</div>;
        }
        render(
            <MemoryRouter initialEntries={['/one']}>
                <Routes>
                    <Route path="/one" element={<One />}></Route>
                    <Route path="/two" element={<Two />}></Route>
                </Routes>
            </MemoryRouter>
        );
        await userEvent.click(screen.getByRole('button', { name: 'go' }));

        expect(screen.getByText(/landed/)).toBeInTheDocument();
    });
});
