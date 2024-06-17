import { render } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
    beforeEach(() => {
        fetch = async () =>
            Promise.resolve({ json: () => Promise.resolve({ message: 'hi' }) });
    });

    it('presents fetched data', async () => {
        const { findByText } = render(<App />);

        expect(await findByText('Received: hi')).toBeDefined();
    });
});
