import React from 'react';

import { render } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            json: () => Promise.resolve({ message: 'hi' }),
        })) as jest.Mock;
    });

    it('presents fetched data', async () => {
        const { findByText } = render(<App />);

        expect(await findByText('Received: hi')).toBeDefined();
    });
});
