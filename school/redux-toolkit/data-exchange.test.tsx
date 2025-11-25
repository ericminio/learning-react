import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useSelector, useStore } from 'react-redux';

import { createSlice, configureStore } from '@reduxjs/toolkit';

describe('Redux toolkit', () => {
    it('can be used to exchange data between components', async () => {
        const greetingSlice = createSlice({
            name: 'greetings',
            initialState: { greetings: '' },
            reducers: {
                setGreetings(state, action) {
                    state.greetings = action.payload;
                },
            },
        });
        const { setGreetings } = greetingSlice.actions;

        const store = configureStore({
            reducer: greetingSlice.reducer,
        });

        function Source() {
            const store = useStore();
            const sendHello = () => {
                store.dispatch(setGreetings('hello world'));
            };
            return <button onClick={sendHello}>send</button>;
        }
        function CapitalizeTarget() {
            const message = useSelector((state: any) => state.greetings);

            return <div>${message.toUpperCase()}</div>;
        }
        render(
            <Provider
                store={store}
                children={
                    <>
                        <Source /> <CapitalizeTarget />
                    </>
                }
            ></Provider>
        );
        await userEvent.click(screen.getByText('send'));

        expect(screen.getByText(/HELLO WORLD/)).toBeInTheDocument();
    });
});
