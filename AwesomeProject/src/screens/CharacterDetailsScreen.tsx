import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Button, Alert, TouchableOpacity} from 'react-native';
import { fetchCharacterDetails } from '../api/RickAndMortyAPI';
import { Character } from '../types/character';
import { useDispatch, useSelector } from 'react-redux';
import {addFavorite, removeFavorite} from '../redux/favoritesSlice';
import PushNotification from 'react-native-push-notification';
import {options} from "axios";

const CharacterDetailsScreen = ({ route, navigation }: { route: any }) => {
	const [characterDetails, setCharacterDetails] = useState<Character | null>(null);
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites.characters);

	const handleAddFavorite = () => {
		if (favorites.length >= 10) {
			// Local Notification göster
			Alert.alert('Favorilerinizde en fazla 10 karakter olabilir!', 'Daha fazla karakter eklemek için favorilerinizden karakter çıkarmanız gerekmektedir.');
		} else {
			//eğer aynı karakter favorilere eklenmeye çalışılırsa uyarı ver
			const isCharacterExist = favorites.find((item: Character) => item.id === characterDetails?.id);
			if (isCharacterExist) {
				Alert.alert('Bu karakter zaten favorilerinizde bulunmaktadır!', 'Aynı karakteri tekrar favorilere ekleyemezsiniz.');
				return;
			}

			//@ts-ignore
			dispatch(addFavorite(characterDetails));
			navigation.navigate('FavoriteCharacters');
		}
	};


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

	const CustomButton = ({ onPress, title }) => (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);

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
					<CustomButton title="Favorilere Ekle" onPress={handleAddFavorite} />
					<CustomButton title="Favoriler" onPress={() => {
						navigation.navigate('FavoriteCharacters');
					}} />

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
	button: {
		marginTop: 20,
		padding: 10,
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: '#f4511e',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	image: {
		width: 250,
		height: 250,
		borderColor: '#f4511e',
		borderWidth: 5,
		marginRight:"auto",
		marginLeft:"auto",
		marginTop: 20,

	},
	detailsContainer: {
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		margin: 20,
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
