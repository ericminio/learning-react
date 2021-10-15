import { screen } from '@testing-library/react';

export function andTheWorldWasChangedForever() {
    expect(screen.getByText(/landed/)).toBeInTheDocument();
}