import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EpisodesScreen from '../screens/EpisodesScreen';
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen';
import CharacterDetailsScreen from "../screens/CharacterDetailsScreen";
import FavoriteCharacters from "../screens/FavoriteCharacters";
import HomeScreen from "../screens/HomeScreen";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

export type RootStackParamList = {
    Home: undefined;
    Episodes: undefined;
    EpisodeDetails: undefined;
    CharacterDetail: undefined;
    FavoriteCharacters: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Ortak header stil ayarları
const commonHeaderStyle = {
    backgroundColor: '#f4511e',
};

const commonHeaderTitleStyle = {
    fontWeight: 'bold',
};

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: commonHeaderStyle,
                headerTintColor: '#fff',
                headerTitleStyle: commonHeaderTitleStyle,
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.navigate('FavoriteCharacters')}
                    >
                        <Text style={styles.headerButtonText}>Favorites</Text>
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="Episodes"
                component={EpisodesScreen}
                options={{ title: 'Episodes' }}
            />
            <Stack.Screen
                name="EpisodeDetails"
                component={EpisodeDetailsScreen}
                options={{ title: 'Episode Details' }}
            />
            <Stack.Screen
                name="CharacterDetail"
                component={CharacterDetailsScreen}
                options={{ title: 'Character Details' }}
            />
            <Stack.Screen
                name="FavoriteCharacters"
                component={FavoriteCharacters}
                options={{ title: 'Favorite Characters' }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 10,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
    },
    headerButtonText: {
        color: '#fff',
    },
});

export default AppNavigator;
