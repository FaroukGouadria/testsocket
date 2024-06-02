import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TabBar from './Tabbar';

const FavoriteList = ({ favorites, toggleFavorite, items }) => {
  console.log("items: " + items)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Publications</Text>
      {items && items.length > 0 ? (
        favorites.map((index) => {
          const item = items[index];
          return (
            <View key={index} style={styles.card}>
              <Image alt="" resizeMode="cover" style={styles.cardImg} source={item?.img} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item?.type}</Text>
                <Text style={styles.cardDescription}>{item?.description}</Text>
                <TouchableOpacity
  onPress={() => toggleFavorite(index)}
  style={styles.removeFavoriteButton}
>
  <Text style={styles.removeFavoriteText}>Remove from Favorites</Text>
</TouchableOpacity>

              </View>
            </View>
          );
        })
      ) : (
        <Text style={styles.noFavoritesText}>You haven't added any publications to favorites yet.</Text>
      )}
      <TabBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImg: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 14,
    color: 'grey',
  },
  removeFavoriteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeFavoriteText: {
    color: 'white',
  },
  noFavoritesText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default FavoriteList;

