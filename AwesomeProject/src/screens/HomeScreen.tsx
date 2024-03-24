import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Navigation tipini ekleyin
type HomeScreenProps = {
	navigation: any; // TypeScript kullanıyorsanız, burada daha spesifik bir tip kullanabilirsiniz.
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			{/* Episodes Screen'e yönlendir */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Episodes')}
			>
				<Text style={styles.buttonText}>Episodes</Text>
			</TouchableOpacity>

			{/* Favorite Characters Screen'e yönlendir */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('FavoriteCharacters')}
			>
				<Text style={styles.buttonText}>Favorite Characters</Text>
			</TouchableOpacity>
		</View>
	);
};

// Stil tanımlamaları
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#333',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	button: {
		width: '70%',
		alignItems: 'center',

		backgroundColor: '#f4511e',
		padding: 10,
		borderRadius: 20,
		marginVertical: 10,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 18,
	},
});

export default HomeScreen;
