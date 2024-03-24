import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {addFavorite, removeFavorite} from '../redux/favoritesSlice';
import {Character} from "../types/character";


const FavoriteCharacters: React.FC = () => {
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites.characters);

	const handleRemoveFavorite = (character: Character) => {
		Alert.alert(
			'Favori Karakteri Kaldır',
			`${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
			[
				{ text: 'Hayır' },
				{ text: 'Evet', onPress: () => dispatch(removeFavorite(character.id)) },
			],
		);
	};

	const renderItem = ({ item }: { item: Character }) => (
		<View style={styles.characterCard}>
			<View style={styles.characterWrapper}>
				<Image source={{uri: item.image}} style={{width: 50, height: 50, borderRadius: 50}} />
				<Text style={styles.characterName}>{item.name}</Text>
			</View>
			<TouchableOpacity
				style={styles.removeButton}
				onPress={() => handleRemoveFavorite(item)}
			>
				<Text style={styles.removeButtonText}>Sil</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={favorites}
				keyExtractor={(item) => item?.name?.toString()}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	characterWrapper:{
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	characterCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 15,
		marginBottom: 10,
	},
	characterName: {
		fontSize: 18,
		color: '#333',
	},
	removeButton: {
		padding: 10,
		backgroundColor: '#f4511e',
		width: 60,
		alignItems: 'center',
		borderRadius: 30,

	},
	removeButtonText: {
		color: '#fff',
		fontSize: 16,
	},
});

export default FavoriteCharacters;
