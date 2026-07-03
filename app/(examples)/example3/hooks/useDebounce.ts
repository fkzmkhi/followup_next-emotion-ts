import { useState, useEffect } from "react";

export default function useDebounce(query: string, delay: number) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [query, delay]);

    return debouncedQuery;
}