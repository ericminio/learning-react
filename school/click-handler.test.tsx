import React, { useState, useEffect, useCallback } from 'react';
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

  it('can useEffect to access async data in callback', async ()=>{
    let getDataAsync = () => {
      type MaybeLoading = { loading:true } | { loading:false, value:string }
      const [data, setData] = useState<MaybeLoading>({ loading:true })

      setTimeout(() => {
        setData({ loading:false, value:42 });
      }, 100);

      return data;
    }

    let Sut = ()=> {
      const [message, setMessage] = useState('hello world');
      const data = getDataAsync();
      const [value, setValue] = useState()

      const go = () => {
        setMessage(`received: ${value}`);
      };

      useEffect(() => {
        setValue(data.value);        
      }, [data.value]);
      
      if (data.loading) {
        return (<div>loading...</div>)
      }
      
      return (
        <>
          <label>{message}</label>
          <button onClick={go}>go</button>
        </>
      )
    }
    render(<Sut />);
    expect(screen.queryByText(/loading/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/hello world/)).toBeInTheDocument();      
    });
    userEvent.click(screen.getByRole('button', { name:'go' }));
    await waitFor(() => {
      expect(screen.getByText(/received: 42/)).toBeInTheDocument();
    });
  });
});

