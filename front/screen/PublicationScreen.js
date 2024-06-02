import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation
import home1 from '../assets/h1.png';
import home2 from '../assets/h1.png';
import home3 from '../assets/h1.png';

const PublicationScreen = () => {
  const [likedPublications, setLikedPublications] = useState([]);
  const [downloadedPublications, setDownloadedPublications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); // Initialize useNavigation

  const publications = [
    {
      id: 1,
      imageUri: home1,
      location: 'Paris, France',
      price: '$100',
      rating: 4.5,
      interactions: {
        saved: 150,
        liked: 300,
      },
    },
    {
      id: 2,
      imageUri: home2,
      location: 'New York, USA',
      price: '$150',
      rating: 4.8,
      interactions: {
        saved: 200,
        liked: 400,
      },
    },
    {
      id: 3,
      imageUri: home3,
      location: 'New York, USA',
      price: '$150',
      rating: 3,
      interactions: {
        saved: 600,
        liked: 400,
      },
    },
  ];

  const toggleLike = id => {
    setLikedPublications(prevLiked =>
      prevLiked.includes(id)
        ? prevLiked.filter(item => item !== id)
        : [...prevLiked, id],
    );
  };

  const toggleDownload = id => {
    setDownloadedPublications(prevDownloaded =>
      prevDownloaded.includes(id)
        ? prevDownloaded.filter(item => item !== id)
        : [...prevDownloaded, id],
    );
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  const navigateBack = () => {
    navigation.goBack(); // Navigate back to the previous screen (HomeScreen)
  };

  const renderPublicationItem = ({item}) => (
    <View style={styles.publicationItem}>
      <Image source={item.imageUri} style={styles.publicationImage} />
      <TouchableOpacity onPress={() => toggleLike(item.id)}>
        <Text
          style={[
            styles.likeIcon,
            {color: likedPublications.includes(item.id) ? 'red' : 'black'},
          ]}>
          {likedPublications.includes(item.id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.locationText}>{item.location}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.starIcon}>⭐</Text>
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.interactionsText}>
          {item.interactions.saved} Saved - {item.interactions.liked} Liked
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backArrow}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={publications}
        renderItem={renderPublicationItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  arrowText: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  searchIcon: {
    fontSize: 20,
  },
  publicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  publicationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  likeIcon: {
    fontSize: 24,
    position: 'absolute',
    top: 10,
    right: 50,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 14,
    color: 'green',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 10,
  },
  interactionsText: {
    fontSize: 14,
    color: '#777',
  },
});

export default PublicationScreen;
