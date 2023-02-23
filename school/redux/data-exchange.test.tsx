import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers } from 'redux';

describe('Redux', () => {
    it('can be used to exchange data between components', () => {
        const initialState = { greetings: '' };
        function greetingsReducer(state = initialState, action) {
            if (action.type == 'greetings') {
                return {
                    ...state,
                    greetings: action.payload,
                };
            }
            return state;
        }
        const store = createStore(greetingsReducer);

        function Source() {
            const dispatch = useDispatch();
            const sendHello = () => {
                dispatch({ type: 'greetings', payload: 'hello world' });
            };
            return <button onClick={sendHello}>send</button>;
        }
        function CapitalizeTarget() {
            const message = useSelector((state) => state.greetings);

            return <div>${message.toUpperCase()}</div>;
        }
        render(
            <Provider store={store}>
                <Source /> <CapitalizeTarget />
            </Provider>
        );
        userEvent.click(screen.getByText('send'));

        expect(screen.getByText(/HELLO WORLD/)).toBeInTheDocument();
    });

    it('supports reducers composition', () => {
        const initialStateA = { value: 'initial-a' };
        function reducerA(state = initialStateA, action) {
            if (action.type == 'update/a') {
                return {
                    ...state,
                    value: action.payload,
                };
            }
            return state;
        }
        const initialStateB = { value: 'initial-b' };
        function reducerB(state = initialStateB, action) {
            if (action.type == 'update/b') {
                return {
                    ...state,
                    value: action.payload,
                };
            }
            return state;
        }
        const store = createStore(
            combineReducers({
                a: reducerA,
                b: reducerB,
            })
        );

        function Source() {
            const dispatch = useDispatch();
            const update = () => {
                dispatch({ type: 'update/b', payload: 'modified-b' });
            };
            return <button onClick={update}>send</button>;
        }
        function Target() {
            const a = useSelector((state) => state.a);
            const b = useSelector((state) => state.b);

            return (
                <div>
                    <label>${a.value}</label>
                    <label>${b.value}</label>
                </div>
            );
        }
        render(
            <Provider store={store}>
                <Source /> <Target />
            </Provider>
        );
        userEvent.click(screen.getByText('send'));

        expect(screen.getByText(/initial-a/)).toBeInTheDocument();
        expect(screen.getByText(/modified-b/)).toBeInTheDocument();
    });
});
