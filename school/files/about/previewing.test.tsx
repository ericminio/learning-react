import React, { useState, useEffect, useCallback } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('file preview', () => {
    it('can be simple', () => {
        let Preview = () => {
            return (
                <>
                    <input type="file" data-testid="file"></input>
                    <button type="button">preview</button>

                    <p data-testid="preview">file content</p>
                </>
            );
        };
        render(<Preview />);

        const file = new File([new ArrayBuffer(1)], 'file.txt');
        fireEvent.change(screen.getByTestId('file'), {
            target: { files: [file] },
        });
        userEvent.click(screen.getByRole('button', { name: 'preview' }));

        expect(screen.getByTestId('preview').textContent).toMatch(
            /file content/
        );
    });
});
