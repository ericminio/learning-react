import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export function One({ then }) {
    const [next, setNext] = useState(false);

    return (
        <>
            {next && <Redirect to={then} />}
            <button
                onClick={() => {
                    setNext(true);
                }}
            >
                go
            </button>
        </>
    );
}
