import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('useState', () => {
    it('can take default value', () => {
        function Hello() {
            const [greetings, setGreetings] = useState('hello');

            return <div data-testid="this-id">${greetings}</div>;
        }
        render(<Hello />);

        expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
    });

    it('offers easy update mechanism', () => {
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
        fireEvent(
            screen.getByTestId('change'),
            new MouseEvent('click', { bubbles: true })
        );

        expect(screen.getByTestId('this-id')).toHaveTextContent('hi');
    });

    it('needs a mounted component', async () => {
        let errorMessage = '';
        jest.spyOn(console, 'error').mockImplementationOnce((message) => {
            errorMessage = message;
        });
        let App = () => {
            const [showOne, setShowOne] = useState(true);
            const [showTwo, setShowTwo] = useState(false);

            useEffect(() => {
                setTimeout(() => {
                    setShowOne(false);
                    setShowTwo(true);
                }, 1);
            });
            return (
                <>
                    {showOne && <One />}
                    {showTwo && <Two />}
                </>
            );
        };
        let One = () => {
            const [data, setData] = useState('welcome');

            useEffect(() => {
                setTimeout(() => {
                    setData('hello world');
                }, 150);
            });
            return <div>${data}</div>;
        };
        let Two = () => {
            const [message, setMessage] = useState('loading');
            useEffect(() => {
                setTimeout(() => {
                    setMessage('two');
                }, 300);
            });
            return <div>${message}</div>;
        };
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText(/two/)).toBeInTheDocument();

            expect(errorMessage).toContain(
                "Can't perform a React state update on an unmounted component"
            );
        });
    });
});
