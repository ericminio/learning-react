import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom/matchers';

describe('toBeVisibleWithAAContrast jest custom matcher', () => {
    it('is useful when native matcher is not enough', () => {
        render(
            <div style={{ color: 'red', backgroundColor: 'red' }}>hello</div>
        );
        expect(screen.getByText('hello')).toBeVisible();
    });

    it('can leverage computed styles', () => {
        render(
            <div style={{ color: 'red', backgroundColor: 'red' }}>hello</div>
        );
        expect(() =>
            expect(screen.getByText('hello')).toHaveAAContrast()
        ).toThrow('element does not have AA contrast');
    });

    it('can have feature envy syndrome', () => {
        render(
            <div
                style={{
                    color: 'blue',
                    backgroundColor: 'white',
                    display: 'none',
                }}
            >
                hello
            </div>
        );
        expect(screen.getByText('hello')).toHaveAAContrast();
        expect(() => expect(screen.getByText('hello')).toBeVisible()).toThrow(
            'element is not visible'
        );
    });

    it('can use existing matcher', () => {
        render(
            <div
                style={{
                    color: 'blue',
                    backgroundColor: 'white',
                    display: 'none',
                }}
            >
                hello
            </div>
        );
        expect(() =>
            expect(screen.getByText('hello')).toBeVisibleWithAAContrast()
        ).toThrow('element is not visible');
    });

    it('can extend existing matcher', () => {
        render(
            <div
                style={{
                    color: 'white',
                    backgroundColor: 'white',
                    display: 'block',
                }}
            >
                hello
            </div>
        );
        expect(() =>
            expect(screen.getByText('hello')).toBeVisibleWithAAContrast()
        ).toThrow('element does not have AA contrast');
    });

    it('can be inverted', () => {
        render(
            <div
                style={{
                    color: 'white',
                    backgroundColor: 'white',
                    display: 'block',
                }}
            >
                hello
            </div>
        );
        expect(screen.getByText('hello')).not.toBeVisibleWithAAContrast();
    });

    it('works with css classes as well', () => {
        render(
            <div>
                <style>{`
                    .stealth {
                        color: red;
                        background-color: red;
                    }
                `}</style>
                <div className="stealth">hello</div>
            </div>
        );
        expect(() =>
            expect(screen.getByText('hello')).toHaveAAContrast()
        ).toThrow('element does not have AA contrast');
    });

    it('passes when all criteria are met', () => {
        render(
            <div
                style={{
                    color: 'blue',
                    backgroundColor: 'white',
                    display: 'block',
                }}
            >
                hello
            </div>
        );
        expect(screen.getByText('hello')).toBeVisibleWithAAContrast();
    });

    it('explains why .not fails', () => {
        render(
            <div
                style={{
                    color: 'blue',
                    backgroundColor: 'white',
                    display: 'block',
                }}
            >
                hello
            </div>
        );
        expect(() =>
            expect(screen.getByText('hello')).not.toBeVisibleWithAAContrast()
        ).toThrow('element is visible with AA contrast');
        expect(() =>
            expect(screen.getByText('hello')).not.toHaveAAContrast()
        ).toThrow('element has AA contrast');
    });

    it('resists equivalent color notations', () => {
        render(
            <div style={{ color: 'red', backgroundColor: 'rgb(255, 0, 0)' }}>
                hello
            </div>
        );
        expect(screen.getByText('hello')).not.toHaveAAContrast();
    });

    it('fails when contrast is not enough', () => {
        render(
            <div style={{ color: 'red', backgroundColor: 'rgb(250, 0, 0)' }}>
                hello
            </div>
        );
        expect(screen.getByText('hello')).not.toHaveAAContrast();
    });
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveAAContrast(): R;
            toBeVisibleWithAAContrast(): R;
        }
    }
}
const namedColors: Record<string, string> = {
    red: 'rgb(255, 0, 0)',
    white: 'rgb(255, 255, 255)',
    blue: 'rgb(0, 0, 255)',
};
function normalize(color: string) {
    return namedColors[color] ?? color;
}
function channels(color: string): number[] {
    const match = normalize(color).match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) {
        throw new Error(`unsupported color: ${color}`);
    }
    return [Number(match[1]), Number(match[2]), Number(match[3])];
}
function relativeLuminance(color: string): number {
    const [r, g, b] = channels(color).map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const WCAG_AA_MINIMUM_CONTRAST_RATIO = 4.5;
function wcagContrastRatio(color: string, backgroundColor: string): number {
    const luminances = [
        relativeLuminance(color),
        relativeLuminance(backgroundColor),
    ];
    const lighter = Math.max(...luminances);
    const darker = Math.min(...luminances);
    return (lighter + 0.05) / (darker + 0.05);
}
function toHaveAAContrast(received: HTMLElement) {
    const element = received;
    const computedStyle = getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;

    const hasAAContrast =
        wcagContrastRatio(color, backgroundColor) >=
        WCAG_AA_MINIMUM_CONTRAST_RATIO;

    return {
        message: () =>
            hasAAContrast ? `element has AA contrast` : `element does not have AA contrast`,
        pass: hasAAContrast,
    };
}
expect.extend({
    toHaveAAContrast,
    toBeVisibleWithAAContrast(received) {
        const element = received;
        const visibleResult = toBeVisible.call(this, element);
        if (!visibleResult.pass) {
            return visibleResult;
        }
        const contrastResult = toHaveAAContrast.call(this, element);
        if (!contrastResult.pass) {
            return contrastResult;
        }
        return {
            pass: true,
            message: () => 'element is visible with AA contrast',
        };
    },
});
