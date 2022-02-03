import React, { useState, useEffect } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react'

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

  it('can happen async', async ()=>{
    let Initial = ()=> {
        const [shouldRedirect, setShouldRedirect] = useState(false);
        useEffect(() => {
            setTimeout(() => {
                setShouldRedirect(true)
            }, 150)
        })
        return (
            <>
                { shouldRedirect && <Redirect to="/final" /> }
                <div>initial</div>
            </>
        )
    }
    let Final = ()=> {
        return (
            <div>landed</div>
        )
    }
    render(
        <MemoryRouter initialEntries={["/initial"]}>
            <Switch>
                <Route path="/initial">
                    <Initial />
                </Route>
                <Route path="/final">
                    <Final />
                </Route>
            </Switch>
        </MemoryRouter>
    );
    expect(screen.getByText(/initial/)).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getByText(/landed/)).toBeInTheDocument();
    });    
  });
});


