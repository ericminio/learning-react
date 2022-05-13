import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

describe('Redux', () => {

    it('can be used to exchange data between components', () => {
        const initialState = { greetings: '' };
        function greetingsReducer(state = initialState, action) {
            if (action.type == 'greetings') {
                return {
                    ...state,
                    greetings: action.payload
                };
            }
            return state;
        }
        const store = createStore(greetingsReducer);

        function Source() {
            const dispatch = useDispatch();
            const sendHello = () => {
                dispatch({ type: 'greetings', payload: 'hello world' })
            }
            return (
                <button onClick={sendHello}>send</button>
            )
        }
        function CapitalizeTarget() {
            const message = useSelector(state => state.greetings)

            return (<div>${message.toUpperCase()}</div>)
        }
        render(<Provider store={store}><Source /> <CapitalizeTarget /></Provider>);
        userEvent.click(screen.getByText('send'));

        expect(screen.getByText(/HELLO WORLD/)).toBeInTheDocument();
    });
});