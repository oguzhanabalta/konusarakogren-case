import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import EpisodeList from "../components/EpisodeList";
import Pagination from "../components/Pagination";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const EpisodesScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1); // Mevcut sayfa numarası
  const [totalPages, setTotalPages] = useState(3); // Toplam sayfa sayısı

  // Sayfa değişikliği fonksiyonu
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
      <View style={styles.container}>
        {/* EpisodeList'e mevcut sayfa numarasını ve toplam sayfa sayısını güncelleme fonksiyonunu prop olarak geçir */}
        <EpisodeList
            navigation={navigation}
            page={page}
        />
        {/* Pagination componentini kullan */}
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
      backgroundColor: '#333333',
  },
});

export default EpisodesScreen;
