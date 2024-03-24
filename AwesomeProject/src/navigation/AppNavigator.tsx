import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EpisodesScreen from '../screens/EpisodesScreen';
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen';
import CharacterDetailsScreen from "../screens/CharacterDetailsScreen";
import FavoriteCharacters from "../screens/FavoriteCharacters";
import {Alert, Button} from "react-native";
import HomeScreen from "../screens/HomeScreen";

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
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerRight: () => (
                        <Button
                            title="Search"
                            onPress={() => Alert.alert('Search button clicked!')}
                            // React Native'deki Button bileşeni "style" prop'unu desteklemez.
                            // Eğer özel bir stil uygulamak isterseniz, TouchableOpacity veya TouchableHighlight gibi bileşenleri kullanabilirsiniz.
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Episodes"
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
            <Stack.Screen
                name="FavoriteCharacters"
                component={FavoriteCharacters}
                options={{
                    title: 'Favorite Characters',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
