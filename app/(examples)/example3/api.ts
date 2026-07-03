export interface Movie {
	id: string;
	title: string;
	summary: string;
	image: string;
	year: number;
	url: string;
}

export const searchMoviesApi = async (query: string, signal?: AbortSignal): Promise<Movie[]> => {
	if (!query.trim()) {
		return [];
	}
	const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
	const response = await fetch(url, { signal })
	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}
	const data = await response.json()

	interface TVMazeResult {
		show: {
			id: number;
			name: string;
			url: string;
			summary?: string;
			image?: {
				medium: string;
			};
			premiered?: string;
		};
	}

	return data.map((item: TVMazeResult) => {
		const cleanSummary = item.show.summary
			? item.show.summary.replace(/<[^>]*>/g, "")
			: "No summary available";
		return {
			id: String(item.show.id),
			title: item.show.name,
			summary: cleanSummary,
			image: item.show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image",
			year: item.show.premiered ? new Date(item.show.premiered).getFullYear() : 0,
			url: item.show.url,
		}
	})
}