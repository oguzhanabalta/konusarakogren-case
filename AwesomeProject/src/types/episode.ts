// Episode bilgileri için interface
export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}

// Episodes API response için interface
export interface EpisodesResponse {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Episode[];
}
