import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import favoritesReducer from '../redux/favoritesSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['favorites'],
};

const rootReducer = combineReducers({
	favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['persist/PERSIST'],
				// Ignore these field paths in all actions
				ignoredActionPaths: ['register', 'rehydrate'],
				// Ignore these paths in the state
				ignoredPaths: ['some.nonSerializable.path'],
			},
		}),
});

export const persistor = persistStore(store);
