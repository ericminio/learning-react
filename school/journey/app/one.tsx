import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export function One({ then }) {
    const [next, setNext] = useState(false);

    return (
        <>
            {next && <Navigate to={then} />}
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
