import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView
} from 'react-native';
import {fetchCharacterDetails, fetchEpisodeDetails} from '../api/RickAndMortyAPI';
import { Episode } from '../types/episode';
import {Character} from "../types/character";

// Bu componentin props olarak bir bölüm ID'si alması beklenir
// Örneğin, React Navigation kullanıyorsanız, bu ID route.params üzerinden gelebilir
const EpisodeDetailsScreen = ({ route, navigation }: { route: any }) => {
  const [episodeDetails, setEpisodeDetails] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetailsAndCharacters = async () => {
      setIsLoading(true);
      try {
        const episodeId = route.params?.episodeId;
        if (episodeId) {
          const episodeData = await fetchEpisodeDetails(episodeId);
          setEpisodeDetails(episodeData);

          // Karakter detaylarını çek
          const characterPromises = episodeData.characters.map(url => {
            const characterId = url.split('/').pop(); // URL'den ID'yi çıkar
            return fetchCharacterDetails(characterId);
          });
          const charactersData = await Promise.all(characterPromises);
          setCharacters(charactersData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsAndCharacters();
  }, [route.params?.episodeId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderCharacter = ({ item }: { item: Character }) => (
      <TouchableOpacity style={styles.characterCard} onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}>
        <Image source={{uri: item.image}} style={{width: 50, height: 50, borderRadius: 50}} />
        <Text style={styles.characterName}>{item.name}</Text>
        {/* Karakter detayları */}
        </TouchableOpacity>
    );


  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{episodeDetails?.name}</Text>
          <Text style={styles.detailText}>Air date: {episodeDetails?.air_date}</Text>
          <Text style={styles.detailText}>Episode: {episodeDetails?.episode}</Text>

          {/* Karakterler listesi */}
          <View style={styles.characterListContainer}>
            <Text style={styles.subtitle}>Characters:</Text>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCharacter}
            />
          </View>
        </View>
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    margin: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  characterListContainer: {
    marginTop: 10,
  },
  characterName: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 5,
  },
    characterCard: {
        flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default EpisodeDetailsScreen;
