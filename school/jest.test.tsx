import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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
});
