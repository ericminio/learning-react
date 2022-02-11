import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('custom hook', ()=>{

  it('must have a name starting with use', ()=>{
    function useThat() {
      const [greetings] = useState('hello');

      return greetings;
    }
    function Hello() {
      const greetings = useThat();

      return (
        <div data-testid="this-id">${greetings}</div>
      )
    }
    render(<Hello />);

    expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
  });

  it('can be async', async ()=> {
    function useThat() {
      const [greetings, setGreetings] = useState('hello');

      setTimeout(()=> {
        setGreetings('hello world');
      }, 15);

      return greetings;
    }
    function Hello() {
      const greetings = useThat();

      return (
        <div data-testid="this-id">${greetings}</div>
      )
    }
    render(<Hello />);

    await waitFor(()=> {
      expect(screen.getByTestId('this-id')).toHaveTextContent('hello world');
    });
  });
});

