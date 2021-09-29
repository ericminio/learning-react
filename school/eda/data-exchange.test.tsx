import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { Bus } from './event-bus';

describe('Data exchange between components', ()=>{

    it('can be achieved via pub/sub mechanism', ()=>{
        let bus = new Bus();
        function Source({bus}) {
            const sendHello = ()=> {
                bus.broadcast('data', 'hello world');
            }
            return (
                <button onClick={sendHello}>send</button>                
            )
        }
        function Target({bus}) {
            const [message, setMessage] = useState();
            const update = value => setMessage(value);

            bus.register('data', update);

            return (<div>${message}</div>)
        }
        function CapitalizeTarget({bus}) {
            const [message, setMessage] = useState();
            const update = value => setMessage(value.toUpperCase());

            bus.register('data', update);

            return (<div>${message}</div>)
        }
        render(<><Source bus={bus}/> <Target bus={bus}/> <CapitalizeTarget bus={bus}/></>);
        userEvent.click(screen.getByText('send'));

        expect(screen.getByText(/hello world/)).toBeInTheDocument();
        expect(screen.getByText(/HELLO WORLD/)).toBeInTheDocument();
    });
});