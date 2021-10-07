import React, { useReducer } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

describe('useReducer', ()=>{

  it('can help to update object', ()=>{
    function Hello() {
      const initial = { message:'hello world' };
      const reducer = (state)=> {
        return { message:'hi world' };
      }
      const [state, dispatch] = useReducer(reducer, initial);

      return (
        <div>
          <div>${state.message}</div>
          <button onClick={ ()=> { dispatch(); }}>change</button>
        </div>
      )
    }
    render(<Hello />);
    expect(screen.getByText(/hello world/)).toBeInTheDocument();
    userEvent.click(screen.getByText('change'));

    expect(screen.getByText(/hi world/)).toBeInTheDocument();
  });
});