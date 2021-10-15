import { screen } from '@testing-library/react';

export function thenWeSeeTheFirstPage() {
    expect(screen.getByRole('button', { name:'go' })).toBeInTheDocument();
}
export function thenWeSeeTheSecondPage() {
    expect(screen.getByText(/landed/)).toBeInTheDocument();
}