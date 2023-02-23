import { screen } from '@testing-library/react';

export function theWorldWasChangedForever() {
    expect(screen.getByText(/landed/)).toBeInTheDocument();
}
