import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EpisodesScreen from '../screens/EpisodesScreen';
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen';
import CharacterDetailsScreen from "../screens/CharacterDetailsScreen";

export type RootStackParamList = {
    Home: undefined;
    EpisodeDetails: undefined; // Bu parametre ismi daha tanımlayıcı olacak şekilde güncellendi.
    CharacterDetail: undefined;
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
            screenOptions={{
                headerStyle: commonHeaderStyle,
                headerTintColor: '#fff',
                headerTitleStyle: commonHeaderTitleStyle,
            }}
        >
            <Stack.Screen
                name="Home"
                component={EpisodesScreen}
                options={{
                    title: 'Episodes',
                }}
            />
            <Stack.Screen
                name="EpisodeDetails" // Bu ismi de daha açıklayıcı olacak şekilde güncelledim.
                component={EpisodeDetailsScreen}
                options={{
                    title: 'Episode Details',
                }}
            />
            <Stack.Screen
                name="CharacterDetail"
                component={CharacterDetailsScreen}
                options={{
                    title: 'Character Details',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
