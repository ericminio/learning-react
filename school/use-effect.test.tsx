import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'

describe('useEffect', ()=>{

  it('can set initial value', ()=>{
    function Hello() {
      const [greetings, setGreetings] = useState();
      useEffect(()=>{
        setGreetings('hello')
      })

      return (
        <div data-testid="this-id">${greetings}</div>
      )
    }
    render(<Hello />);

    expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
  });

  it('can detect value change', ()=>{
    function Hello() {
      const [greetings, setGreetings] = useState('hello');
      const [message, setMessage] = useState();
      
      useEffect(()=>{
        setMessage(`${greetings} world`)
      }, [greetings])

      return (
        <div>
          <div data-testid="this-id">${message}</div>
          <button data-testid="change" onClick={ ()=> { setGreetings('hi'); }}>change</button>
        </div>
      )
    }
    render(<Hello />);
    expect(screen.getByTestId('this-id')).toHaveTextContent('hello world');

    fireEvent(screen.getByTestId('change'), new MouseEvent('click', { bubbles: true }))
    expect(screen.getByTestId('this-id')).toHaveTextContent('hi world');
  });
});