import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function somethingCrazyHappened() {
    userEvent.click(screen.getByRole('button', { name:'go' }));
}