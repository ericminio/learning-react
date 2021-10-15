import * as React from 'react';
import { MemoryRouter, Switch, Route, Redirect } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('Redirect', ()=>{

  it('is available', ()=>{
    render(
        <MemoryRouter initialEntries={["/initial"]}>
            <Switch>
                <Route path="/initial">
                    <Redirect to="/final" />
                </Route>
                <Route path="/final">
                    <div>landed</div>
                </Route>
            </Switch>
        </MemoryRouter>
    );

    expect(screen.getByText(/landed/)).toBeInTheDocument();
  });
});