import axios from 'axios';
import {Episode, EpisodesResponse} from "../types/episode";
import {Character} from "../types/character";




// Bölümleri çeken fonksiyon
export const fetchEpisodes = async (page: number = 1): Promise<EpisodesResponse> => {

	try {
		const response = await axios.get<EpisodesResponse>(`https://rickandmortyapi.com/api/episode?page=${page}`);
		return response.data as EpisodesResponse;
	} catch (error) {
		throw new Error('Error fetching episodes');
	}
};

// Bölüm detaylarını çeken fonksiyon
export const fetchEpisodeDetails = async (episodeId: number): Promise<Episode> => {
	try {
		const response = await axios.get<Episode>(`https://rickandmortyapi.com/api/episode/${episodeId}`);
		return response.data as Episode;
	} catch (error) {
		throw new Error('Error fetching episode details');
	}
};



// Karakter detaylarını çeken fonksiyon
export const fetchCharacterDetails = async (characterId: string): Promise<Character> => {
	try {
		const response = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${characterId}`);
		return response.data as Character;
	} catch (error) {
		throw new Error('Error fetching character details');
	}
};
