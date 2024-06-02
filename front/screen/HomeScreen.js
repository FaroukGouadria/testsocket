import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logon from '../assets/h1.png';
import profile from '../assets/h1.png';
import notif from '../assets/h1.png';
import loupe from '../assets/h1.png';
import home1 from '../assets/h1.png';
import home2 from '../assets/h1.png';
import home3 from '../assets/h1.png';
import villaLogo from '../assets/h1.png';
import apartmentLogo from '../assets/h1.png';
import houseLogo from '../assets/h1.png';
import heartRed from '../assets/h1.png';
import heartGray from '../assets/h1.png';
import TabBar from './Tabbar';
import FavoriteList from './FavoriteList';
import { setUserId } from 'firebase/analytics';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token,setToken]=useState(null);
  const [userId,setUserId]=useState(null);
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Assuming you're storing the user's token
        const response = await fetch('http://192.168.52.122:4000/publications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adjust if you're using a different auth method
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data: ", data);
        setPublications(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(index)) {
        // Remove from favorites
        return prevFavorites.filter((item) => item !== index);
      } else {
        // Add to favorites
        return [...prevFavorites, index];
      }
    });
  };

  const isFavorite = (index) => favorites.includes(index);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentPage((prevPage) => (prevPage < 2 ? prevPage + 1 : 0));
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   scrollViewRef.current?.scrollTo({
  //     x: currentPage * screenWidth,
  //     animated: true,
  //   });
  // }, [currentPage]);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const goToRecommendedOptions = () => {
    navigation.navigate('Recommended');
  };
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token')&&
      await AsyncStorage.removeItem('user');
      setToken('');
      setUserId('')
      navigation.replace('SigninScreen');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
      {/* <TouchableOpacity style={{borderRadius:10,backgroundColor:"blue"}}onPress={logout}>
          <Text style={{color:"white"}}>LOgOUt</Text>
        </TouchableOpacity> */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/6879/6879751.png"}} style={styles.logo} />
          <TouchableOpacity onPress={goToProfile} style={styles.profileContainer}>
            <Image source={{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"}} style={styles.profileImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNotifications} style={styles.notificationContainer}>
            <Image source={{uri:'https://static.vecteezy.com/ti/vecteur-libre/t1/1505138-icone-de-cloche-de-notification-vectoriel.jpg'}} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1200px-Search_Icon.svg.png"}} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for Villa, Apartment, ..."
            style={styles.searchInput}
          />
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {["https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg"].map((image, index) => (
              <Image
                key={index}
                source={{uri:image}}
                style={[styles.homeImage, { width: screenWidth }]}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesText}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            <View style={styles.categoryBox}>
              <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/296/296822.png"}} style={styles.categoryLogo} />
              <Text style={styles.categoryText}>Villa</Text>
            </View>
            <View style={styles.categoryBox}>
              <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/5792/5792154.png"}} style={styles.categoryLogo} />
              <Text style={styles.categoryText}>Apartment</Text>
            </View>
            <View style={styles.categoryBox}>
              <Image source={{uri:"https://cdn-icons-png.flaticon.com/256/2453/2453831.png"}} style={styles.categoryLogo} />
              <Text style={styles.categoryText}>House</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesText}>Recommended for you</Text>
            <TouchableOpacity onPress={goToRecommendedOptions}>
              <Text style={styles.arrowText}></Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedScrollView}
          >
            {["https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg", "https://c4.wallpaperflare.com/wallpaper/831/432/1004/contemporary-dream-villa-in-california-gray-rectangular-concrete-firepit-wallpaper-preview.jpg"].map((image, index) => (
              <Image
                key={index}
                source={{uri:image}}
                style={[styles.recommendedImage, { width: 280 }]}
              />
            ))}
          </ScrollView>
          <Text style={styles.categoriesText}>Publications</Text>
        </View>
        <View style={styles.spacer} />
        {publications.map(({ images, type, price, description, address, createdAt, _id }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Details', { publicationId: _id })}
          >
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Image alt="" resizeMode="cover" style={styles.cardImg} source={{ uri: `http://192.168.52.122:4000/${images[0]}` }} />
                <TouchableOpacity
                  onPress={() => toggleFavorite(index)}
                  style={styles.favoriteIcon}
                >
                  <Image
                    source={{uri:"https://static.thenounproject.com/png/3565598-200.png"}}
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{type}</Text>
                  <Text style={styles.cardPrice}>{price}</Text>
                </View>
                <Text style={styles.cardDescription}>{description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardLocation}>{address}</Text>
                  <Text style={styles.cardDate}>
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'short',
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* <FavoriteList
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          items={publications}
        /> */}
       
      </ScrollView>
      
      <View style={styles.tabBarContainer}>
        <TabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  notificationContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
  },
  notificationIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 150,
    height: 35,
    marginRight: 130,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    height: 40,
    borderColor: 'grey',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesText: {
    color: 'darkgreen',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesScrollView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryLogo: {
    width: 40,
    height: 40,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  recommendedScrollView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  scrollViewContainer: {
    height: 200,
    marginTop: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  homeImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  recommendedImage: {
    height: 180,
    resizeMode: 'cover',
    marginRight: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTop: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardImg: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 14,
    color: 'grey',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardLocation: {
    fontSize: 14,
    color: 'grey',
  },
  cardDate: {
    fontSize: 14,
    color: 'grey',
  },
  spacer: {
    height: 20,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    paddingTop: 10,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
