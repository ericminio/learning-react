import React, { useState, useEffect, useCallback } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('User Input', () => {

  it('can handle textarea', () => {
    let Hello = () => {
      const [message, setMessage] = useState('hello');

      const notify = (event) => {
        setMessage('modified: ' + event.target.value);
      }

      return (
        <>
          <textarea onChange={notify} data-testid="that-input"></textarea>
          <label>{message}</label>
        </>
      )
    }
    render(<Hello />);

    userEvent.type(screen.getByTestId('that-input'), 'hi');

    expect(screen.getByText(/modified: hi/)).toBeInTheDocument();
  });

});

