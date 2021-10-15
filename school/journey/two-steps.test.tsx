import React, { useState } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

describe('Two steps journey', ()=>{

    function One() {
        const [next, setNext] = useState(false);

        return (
            <>
                { next && <Redirect to="/two" />}
                <button onClick={ () => { setNext(true); } }>go</button>
            </>
        )
    }
    function Two() {
        return <div>landed</div>
    }

    let givenWeOpenTheFirstStep = ()=> {
        render(
            <MemoryRouter initialEntries={["/one"]}>
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
    }
    let whenWeContinueToNextStep = () => {
        userEvent.click(screen.getByRole('button', { name:'go' }));
    }
    let thenWeSeeTheSecondStep = () => {
        expect(screen.getByText(/landed/)).toBeInTheDocument();
    }
    it('can be told as a story', ()=>{
        givenWeOpenTheFirstStep();
        whenWeContinueToNextStep();

        thenWeSeeTheSecondStep();  
    });
});