import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('useEffect', ()=>{

  it('can set initial value', ()=>{
    let Hello = ()=> {
      const [greetings, setGreetings] = useState();
      useEffect(()=>{
        setGreetings('hello')
      })

      return (
        <div role="greetings">${greetings}</div>
      )
    }
    render(<Hello />);

    expect(screen.getByRole("greetings")).toHaveTextContent('hello');
  });

  it('can detect value change', ()=>{
    let Hello = ()=> {
      const [greetings, setGreetings] = useState('hello');
      const [message, setMessage] = useState();
      
      useEffect(()=>{
        setMessage(`${greetings} world`)
      }, [greetings])

      return (
        <>
          <div>${message}</div>
          <button onClick={ ()=> { setGreetings('hi'); }}>change</button>
        </>
      )
    }
    render(<Hello />);
    expect(screen.getByText(/hello world/)).toBeInTheDocument();

    userEvent.click(screen.getByText('change'));
    expect(screen.getByText(/hi world/)).toBeInTheDocument();
  });

  it('can use external function', ()=>{
    let returningWhat = ()=> 'world';
    let Hello = ({getData})=> {
      const [greetings, setGreetings] = useState('hello');
      const [message, setMessage] = useState();

      useEffect(()=>{
        setMessage(`${greetings} ${getData()}`)
      })
      
      return (
        <>
          <div>${message}</div>
          <button onClick={ ()=> { setGreetings('hi'); }}>change</button>
        </>
      )
    }
    render(<Hello getData={returningWhat}/>)
    expect(screen.getByText(/hello world/)).toBeInTheDocument();

    userEvent.click(screen.getByText('change'));
    expect(screen.getByText(/hi world/)).toBeInTheDocument();
  });

  it('resists promise', async ()=>{
    let returningWhat = ()=> Promise.resolve('hello world');

    let Hello = ({getData})=> {
      const [message, setMessage] = useState();

      useEffect(()=>{
        getData()
          .then(value => setMessage(value))
          .catch(error => setMessage(null, error.message));
      })
      
      return (
        <>
          <div>${message}</div>
        </>
      )
    }
    render(<Hello getData={returningWhat}/>);

    await waitFor(() => screen.getByText(/hello world/));
  });
});