import * as React from 'react';
import '@testing-library/jest-dom';

const getTextContent = (node) => {
    if (['string', 'number'].includes(typeof node)) return node;
    if (node instanceof Array) return node.map(getTextContent).join('');
    if (
        typeof node === 'object' &&
        node &&
        node.type &&
        ['function'].includes(typeof node.type)
    ) {
        return getTextContent(node.type());
    }
    if (typeof node === 'object' && node) {
        return getTextContent(node.props.children);
    }
};

describe('textContent util', () => {
    it('is not native', () => {
        const Hello = (): JSX.Element => {
            return <div>hello world</div>;
        };
        const wrapper = (
            <div>
                wrapping:
                <Hello />
            </div>
        );

        expect(getTextContent(wrapper)).toEqual('wrapping:hello world');
    });
});
