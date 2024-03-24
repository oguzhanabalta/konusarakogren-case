import React, { useState, useEffect } from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { fetchEpisodes } from '../api/RickAndMortyAPI';
import { Episode } from '../types/episode';
import SearchBar from "./SearchBar";

const EpisodeList = ({navigation, page}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
	const [episodes, setEpisodes] = useState<Episode[]>([]);

	useEffect(() => {
		// Arama terimine göre filtreleme yap
		const filtered = episodes.filter((episode: Episode) =>
			episode.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setFilteredEpisodes(filtered);
	}, [searchQuery, episodes]);

	useEffect(() => {
		const fetchAndSetEpisodes = async () => {
			try {
				const data = await fetchEpisodes(page);
				setEpisodes(data.results);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAndSetEpisodes();
	}, [page]);

	const renderItem = ({ item }: { item: Episode }) => (
		<TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EpisodeDetails', { episodeId: item.id })}>
			<Text style={styles.title}>{item.name}</Text>
			<Text style={styles.details}>{item.episode} - {item.air_date}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<SearchBar onSearch={setSearchQuery} />
			<FlatList
				data={filteredEpisodes}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		padding: 10,
		backgroundColor: '#333333',
	},
	card: {
		backgroundColor: '#fff', // Kartın arka plan rengi
		borderRadius: 8, // Kartın kenar yuvarlaklığı
		padding: 15, // İç padding
		marginBottom: 10, // Kartlar arası mesafe

	},
	title: {
		fontSize: 18, // Başlık font boyutu
		fontWeight: 'bold', // Başlık font kalınlığı
		marginBottom: 5, // Başlık ile detaylar arası mesafe
		color: '#333', // Başlık font rengi
	},
	details: {
		fontSize: 14, // Detaylar font boyutu
		color: '#666', // Detaylar font rengi
	},
});

export default EpisodeList;
