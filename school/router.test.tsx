import * as React from 'react';
import { MemoryRouter, Switch, Route } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('Router', ()=>{

  it('needs exact attribute on / to not be always selected', ()=>{
    render(
        <MemoryRouter initialEntries={["/page"]}>
            <Route exact path="/">
                <div>home</div>
            </Route>
            <Route path="/page">
                <div>page</div>
            </Route>
        </MemoryRouter>
    );

    expect(screen.getByText(/page/)).toBeInTheDocument();
    expect(screen.queryByText(/home/)).not.toBeInTheDocument();
  });

  it('will select both paths otherwise', ()=>{
    render(
        <MemoryRouter initialEntries={["/page"]}>
            <Route path="/">
                <div>home</div>
            </Route>
            <Route path="/page">
                <div>page</div>
            </Route>
        </MemoryRouter>
    );

    expect(screen.getByText(/page/)).toBeInTheDocument();
    expect(screen.queryByText(/home/)).toBeInTheDocument();
  });

  it('will select the first matching with Switch', ()=>{
    render(
        <MemoryRouter initialEntries={["/page"]}>
            <Switch>
                <Route path="/">
                    <div>home</div>
                </Route>
                <Route path="/page">
                    <div>page</div>
                </Route>
            </Switch>
        </MemoryRouter>
    );

    expect(screen.queryByText(/page/)).not.toBeInTheDocument();
    expect(screen.queryByText(/home/)).toBeInTheDocument();
  });
});