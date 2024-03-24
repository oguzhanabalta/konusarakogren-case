import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Character} from "../types/character";


interface FavoritesState {
	characters: Character[];
}

const initialState: FavoritesState = {
	characters: [],
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<Character>) => {
			if (state.characters.length < 10) {
				state.characters.push(action.payload);
			}
			// Hata durumunu burada yönetmek yerine, component içinde kontrol etmek daha mantıklı olabilir
		},
		removeFavorite: (state, action: PayloadAction<number>) => {
			state.characters = state.characters.filter(character => character.id !== action.payload);
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
