import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, renderHook } from '@testing-library/react';

describe('custom hook', () => {
    it('must have a name starting with use', () => {
        function useThat() {
            const [greetings] = useState('hello');

            return greetings;
        }
        function Hello() {
            const greetings = useThat();

            return <div data-testid="this-id">${greetings}</div>;
        }
        render(<Hello />);

        expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
    });

    it('can be async', async () => {
        function useThat() {
            const [greetings, setGreetings] = useState('hello');

            setTimeout(() => {
                setGreetings('hello world');
            }, 15);

            return greetings;
        }
        function Hello() {
            const greetings = useThat();

            return <div data-testid="this-id">${greetings}</div>;
        }
        render(<Hello />);

        await waitFor(() => {
            expect(screen.getByTestId('this-id')).toHaveTextContent(
                'hello world'
            );
        });
    });

    it('discloses intermediary steps', () => {
        function useThat() {
            const [greetings, setGreetings] = useState('hello');

            useEffect(() => {
                setGreetings('hi');
            }, []);

            return greetings;
        }
        let all: any[] = [];
        const result = renderHook(() => {
            const value = useThat();
            all.push(value);
            return value;
        });

        expect(all).toStrictEqual(['hello', 'hi']);
    });
});
