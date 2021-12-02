import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('click handler', ()=>{

  it('can be simple', ()=>{
    let Hello = ()=> {
      const [message, setMessage] = useState('hello');

      const handler = () => {
        setMessage('clicked');
      }

      return (
        <>
          <label>{message}</label>
          <button onClick={handler}>go</button>
        </>
      )
    }
    render(<Hello />);

    userEvent.click(screen.getByRole('button', { name:'go' }));

      expect(screen.getByText(/clicked/)).toBeInTheDocument();
  });

  it('can access attribute', ()=>{
    let Hello = ()=> {
      const [message, setMessage] = useState('hello');
      const value = 42;
      
      const handler = () => {
        setMessage(`clicked - ${value}`);
      }

      return (
        <>
          <label>{message}</label>
          <button onClick={handler}>go</button>
        </>
      )
    }
    render(<Hello />);

    userEvent.click(screen.getByRole('button', { name:'go' }));

    expect(screen.getByText(/clicked - 42/)).toBeInTheDocument();
  });

  it('can access async attribute', async ()=>{
    let getDataAsync = () => {
      const [message, setMessage] = useState('loading');

      useEffect(()=> {
        let mounted = true;
        Promise.resolve('hello world')
          .then((value) => {
            if (mounted) setMessage(value);
          })

        return () => { mounted = false; }
      })

      return message;
    }
    let Hello = ()=> {
      const [message, setMessage] = useState('hello');
      const value = getDataAsync();
      
      const handler = useEffect(() => {
        setMessage(`clicked - ${value}`);
      }, [setMessage, value]);

      if (value == 'loading') {
        return (
          <>
            <div>loading...</div>
          </>
        )
      }

      return (
        <>
          <label>{message}</label>
          <button onClick={handler}>go</button>
        </>
      )
    }
    render(<Hello />);
    expect(screen.getByText(/loading/)).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name:'go' }));
    });
    expect(screen.getByText(/clicked - hello world/)).toBeInTheDocument();
  });
});

function useCallback(arg0: () => void, arg1: undefined[]) {
  throw new Error('Function not implemented.');
}
