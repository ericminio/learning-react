import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'

describe('useState', ()=>{

  it('can take default value', ()=>{
    function Hello() {
      const [greetings, setGreetings] = useState('hello');

      return (
        <div data-testid="this-id">${greetings}</div>
      )
    }
    render(<Hello />);

    expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
  });

  it('offers easy update mechanism', ()=>{
    function Hello() {
      const [greetings, setGreetings] = useState('hello');

      return (
        <div>
          <div data-testid="this-id">${greetings}</div>

          <button data-testid="change" onClick={ ()=> { setGreetings('hi'); }}>change</button>
        </div>
      )
    }
    render(<Hello />);
    fireEvent(screen.getByTestId('change'), new MouseEvent('click', { bubbles: true }))

    expect(screen.getByTestId('this-id')).toHaveTextContent('hi');
  });
});