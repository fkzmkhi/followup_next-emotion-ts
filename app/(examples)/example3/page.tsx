"use client";

import { useState, useEffect } from "react"
import useDebounce from "./hooks/useDebounce";
import { searchMoviesApi, type Movie } from "./api";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

export default function Example3Page() {
	const [query, setQuery] = useState("")
	const debouncedQuery = useDebounce(query, 300);
	const [results, setResults] = useState<Movie[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)


	useEffect(() => {
		const controller = new AbortController();
		if (!debouncedQuery.trim()) {
			setResults([]);
			setIsLoading(false);
			setError(null);
			return;
		}
		setIsLoading(true);
		setError(null);

		searchMoviesApi(debouncedQuery, controller.signal)
			.then((data) => {
				setResults(data);
				setIsLoading(false);
			})
			.catch((err) => {
				if (err.name === "AbortError") {
					console.log("古いリクエストがキャンセルされました:", query);
					return;
				}
				setError(err.message);
				setIsLoading(false);
			})

		return () => {
			controller.abort();
		}
	}, [debouncedQuery]);


	return (
		<>
			<SearchBar
				query={query}
				onQueryChange={setQuery}
				placeholder={"作品名を英語で入力してください"}
			/>
			<MovieList results={results}></MovieList>
		</>
	);
}
