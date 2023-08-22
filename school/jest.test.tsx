import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { when } from 'jest-when';

describe('Jest', () => {
    it('is ready', () => {
        render(<div data-testid="this-id">hello world</div>);

        expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
    });

    it('welcomes components', () => {
        function Hello() {
            return <div data-testid="this-id">hello world</div>;
        }
        render(<Hello />);

        expect(screen.getByTestId('this-id')).toHaveTextContent('hello');
    });

    it('welcomes nested component', () => {
        function Hello() {
            return <div data-testid="this-id">hello world</div>;
        }
        function Wrapper() {
            return (
                <div data-testid="this-wrapper">
                    wrapping <Hello />
                </div>
            );
        }
        render(<Wrapper />);

        expect(screen.getByTestId('this-wrapper')).toHaveTextContent(
            'wrapping hello world'
        );
    });

    it('offers stubbing', () => {
        const sut = jest.fn();

        when(sut).mockReturnValue(42);

        expect(sut()).toBe(42);
    });

    it('selects the most constrainted stub', () => {
        const sut = jest.fn();

        when(sut).calledWith(1, 2).mockReturnValue(3);
        when(sut).mockReturnValue(42);

        expect(sut(1, 2)).toBe(3);
    });
});
