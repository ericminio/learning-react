import React, { useState } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Navigation', () => {
    it('is possible', () => {
        function One() {
            const [next, setNext] = useState(false);

            return (
                <>
                    {next && <Redirect to="/two" />}
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
                <Switch>
                    <Route path="/one">
                        <One />
                    </Route>
                    <Route path="/two">
                        <Two />
                    </Route>
                </Switch>
            </MemoryRouter>
        );
        userEvent.click(screen.getByRole('button', { name: 'go' }));

        expect(screen.getByText(/landed/)).toBeInTheDocument();
    });
});
