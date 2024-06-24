import { useEffect, useState } from 'react';

export function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data')
            .then((response) => response.json())
            .then((incoming) => {
                setData(incoming);
            });
    }, []);

    return <div>Received: {data.message}</div>;
}
