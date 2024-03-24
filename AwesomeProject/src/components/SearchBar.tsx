import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<View style={styles.container}>
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				clearButtonMode="while-editing"
				onChangeText={onSearch}
				placeholder="Search..."
				style={styles.input}
				placeholderTextColor="#666"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom:10,
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 25,
		padding: 15,
		fontSize: 16,
		color: '#333',
		borderColor:'#f4511e',
		borderWidth:2,
	},
});

export default SearchBar;
