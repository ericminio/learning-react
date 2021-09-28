import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('useEffect', ()=>{

  it('can set initial value', ()=>{
    function Hello() {
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
    function Hello() {
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
});