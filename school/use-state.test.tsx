import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('useState', () => {
    it('can take a default value', () => {
        function Hello() {
            const [greetings] = useState('hello');

            return <div data-testid="this-id">${greetings}</div>;
        }
        render(<Hello />);

        expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
    });

    it('offers an update mechanism', async () => {
        function Hello() {
            const [greetings, setGreetings] = useState('hello');

            return (
                <div>
                    <div data-testid="this-id">${greetings}</div>
                    <button
                        data-testid="change"
                        onClick={() => {
                            setGreetings('hi');
                        }}
                    >
                        change
                    </button>
                </div>
            );
        }
        render(<Hello />);
        await fireEvent(
            screen.getByTestId('change'),
            new MouseEvent('click', { bubbles: true })
        );

        expect(screen.getByTestId('this-id')).toHaveTextContent('hi');
    });
});
