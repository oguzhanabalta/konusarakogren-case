import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { fetchCharacterDetails } from '../api/RickAndMortyAPI';
import { Character } from '../types/character';

// Bu componentin props olarak bir karakter ID'si alması beklenir
const CharacterDetailsScreen = ({ route }: { route: any }) => {
	const [characterDetails, setCharacterDetails] = useState<Character | null>(null);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const characterId = route.params?.characterId;
				if (characterId) {
					const data = await fetchCharacterDetails(characterId);
					setCharacterDetails(data);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchDetails();
	}, [route.params?.characterId]);

	if (!characterDetails) {
		return (
			<View style={styles.centered}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<Image source={{ uri: characterDetails.image }} style={styles.image} resizeMode="contain" />
			<View style={styles.detailsContainer}>
				<Text style={styles.name}>{characterDetails.name}</Text>
				<Text style={styles.detail}>Status: {characterDetails.status}</Text>
				<Text style={styles.detail}>Species: {characterDetails.species}</Text>
				<Text style={styles.detail}>Gender: {characterDetails.gender}</Text>
				<Text style={styles.detail}>Origin: {characterDetails.origin.name}</Text>
				<Text style={styles.detail}>Last Known Location: {characterDetails.location.name}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	image: {
		width: '100%',
		height: 300,
	},
	detailsContainer: {
		padding: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#333',
	},
	detail: {
		fontSize: 16,
		marginBottom: 5,
		color: '#555',
	},
});

export default CharacterDetailsScreen;
