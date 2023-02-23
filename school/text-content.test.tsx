import * as React from 'react';
import '@testing-library/jest-dom';

describe('textContent', () => {
    it('is not native', () => {
        const getNodeText = (node) => {
            if (['string', 'number'].includes(typeof node)) return node;
            if (node instanceof Array) return node.map(getNodeText).join('');
            if (
                typeof node === 'object' &&
                node &&
                node.type &&
                ['function'].includes(typeof node.type)
            ) {
                return getNodeText(node.type());
            }
            if (typeof node === 'object' && node) {
                return getNodeText(node.props.children);
            }
        };

        const Hello = (): JSX.Element => {
            return <div>hello world</div>;
        };
        const wrapper = (
            <div>
                wrapping:
                <Hello />
            </div>
        );

        expect(getNodeText(wrapper)).toEqual('wrapping:hello world');
    });
});
