import { useEffect, useState } from 'react';

export function useFetch(
    url: string
): [string, boolean, string] {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleResponseAsText(response: Response) {
        response
            .text()
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(handleResponseAsText)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return [data, loading, error];
}
