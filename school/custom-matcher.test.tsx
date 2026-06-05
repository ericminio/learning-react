import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom/matchers';

describe('jest custom matcher', () => {
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
        expect(() => expect(screen.getByText('hello')).toBeReadable()).toThrow(
            'element is not readable'
        );
    });

    it('can have feature envy syndrome', () => {
        render(
            <div
                style={{
                    color: 'red',
                    backgroundColor: 'white',
                    display: 'none',
                }}
            >
                hello
            </div>
        );
        expect(screen.getByText('hello')).toBeReadable();
        expect(() => expect(screen.getByText('hello')).toBeVisible()).toThrow(
            'element is not visible'
        );
    });

    it('can use existing matcher', () => {
        render(
            <div
                style={{
                    color: 'red',
                    backgroundColor: 'white',
                    display: 'none',
                }}
            >
                hello
            </div>
        );
        expect(() =>
            expect(screen.getByText('hello')).toBePresentAndReadable()
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
            expect(screen.getByText('hello')).toBePresentAndReadable()
        ).toThrow('element is not readable');
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
        expect(screen.getByText('hello')).not.toBePresentAndReadable();
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
        expect(screen.getByText('hello')).toBePresentAndReadable();
    });
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeReadable(): R;
            toBePresentAndReadable(): R;
        }
    }
}
function toBeReadable(received: HTMLElement) {
    const element = received;
    const computedStyle = getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;

    const isReadable = color !== backgroundColor;

    return {
        message: () => `element is not readable`,
        pass: isReadable,
    };
}
expect.extend({
    toBeReadable,
    toBePresentAndReadable(received) {
        const element = received;
        const visibleResult = toBeVisible.call(this, element);
        if (!visibleResult.pass) {
            return visibleResult;
        }
        const readableResult = toBeReadable.call(this, element);
        if (!readableResult.pass) {
            return readableResult;
        }
        return { pass: true, message: () => '' };
    },
});
