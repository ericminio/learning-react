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

  it('can access async attribute', async ()=>{
    let getDataAsync = () => {
      type MaybeLoading = { state:'loading' } | { state:'loaded', value:string }
      const [data, setData] = useState<MaybeLoading>({ state:'loading' })

      setTimeout(() => {
        setData({ loading:false, value:'hello world' });
      }, 1);

      return data;
    }
    let Sut = ()=> {
      const [message, setMessage] = useState('hello');
      const data = getDataAsync();

      const handler = useCallback(() => {
        setMessage(`clicked - ${data.value}`);
      }, [setMessage, data]);
      
      if (data.state == 'loading') {
        return (
          <>
            <div>loading...</div>
          </>
        )
      }

      const { value } = data;
      
      return (
        <>
          <label>received - {value}</label>
          <label>{message}</label>
          <button onClick={handler}>go</button>
        </>
      )
    }
    render(<Sut />);
    expect(screen.queryByText(/loading/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/received - hello world/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name:'go' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name:'go' }));
    });
    expect(screen.getByText(/clicked - hello world/)).toBeInTheDocument();
  });
});

