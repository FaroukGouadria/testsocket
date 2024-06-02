import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Example icons, replace with actual assets
import bathIcon from '../assets/h1.png';
import kitchenIcon from '../assets/h1.png';
import roomIcon from '../assets/h1.png';
import bedIcon from '../assets/h1.png';
import userImage from '../assets/h1.png'; // Example user image
import chatIcon from '../assets/h1.png'; // Example chat icon
import locationIcon from '../assets/h1.png'; // Location icon

const Details = ({ route }) => {
  const { publicationId } = route.params;
  console.log("publicationId",publicationId)
  const [expandedImage, setExpandedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLocationPress = () => {
    // Use actual coordinates from publication data if available
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${publication.address}&travelmode=driving`;
    Linking.openURL(mapUrl);
  };

  const handleImagePress = (imageUri, index) => {
    setExpandedImage(imageUri);
    setActiveIndex(index);
  };

  const handleArrowPress = () => {
    setExpandedImage(null);
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 300);
    setActiveIndex(index);
  };

  const handlePricePress = () => {
    navigation.navigate('Formulaire');
  };

  const handleChatPress = () => {
    console.log('publication fi dest', publication);
    navigation.navigate('ChatRoom',{publication:publication});
  };

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Assuming you're storing the user's token
        console.log(token);
        console.log('im here')
        const response = await fetch(`http://192.168.52.122:4000/publication/${publicationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adjust if you're using a different auth method
          },
        });

        const data = await response.json();
        console.log("data fi details",data);
        setPublication(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
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

  if (!publication) {
    return (
      <View style={styles.errorContainer}>
        <Text>Publication not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {expandedImage ? (
            <TouchableOpacity onPress={handleArrowPress}>
              <Image source={{ uri: expandedImage }} style={styles.expandedImage} />
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onScroll={handleScroll}
                pagingEnabled>
                {publication.images.map((imageUri, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(imageUri, index)}>
                    <Image source={{ uri: `http://192.168.52.122:5000/${imageUri}` }} style={styles.homeImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.dotContainer}>
                {publication.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        borderColor:
                          activeIndex === index ? '#9919' : 'transparent',
                      },
                    ]}>
                    <View
                      style={[
                        styles.dotInner,
                        {
                          backgroundColor:
                            activeIndex === index ? '#FFFFFF' : 'transparent',
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Image source={bathIcon} style={styles.icon} />
            <Text style={{color:'black'}}>{publication.bathrooms} Baths</Text>
          </View>
          <View style={styles.iconBox}>
            <Image source={kitchenIcon} style={styles.icon} />
            <Text style={{color:'black'}}>{publication.kitchens} Kitchens</Text>
          </View>
          <View style={styles.iconBox}>
            <Image source={roomIcon} style={styles.icon} />
            <Text style={{color:'black'}}>{publication.salon} Salons</Text>
          </View>
          <View style={styles.iconBox}>
            <Image source={bedIcon} style={styles.icon} />
            <Text style={{color:'black'}}>{publication.bedrooms} Bedrooms</Text>
          </View>
        </View>

        <View style={styles.userLocationContainer}>
          <View style={styles.userInfoContainer}>
            <Image
              source={userImage}
              style={[styles.userImage, { marginRight: 10 }]}
            />
            <View style={[styles.userDetails, { marginRight: 120 }]}>
              <Text style={[styles.userName,{color:'black'}]}>{publication.userName}</Text>
              <Text style={styles.userPrice}>${publication.price}</Text>
            </View>
            <TouchableOpacity
              onPress={handleChatPress}
              style={styles.chatIconContainer}>
              <Image source={chatIcon} style={styles.chatIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationDescriptionBox}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={[styles.descriptionText,]}>{publication.description}</Text>

            <View style={styles.locationHeader}>
              <Image source={locationIcon} style={styles.locationIcon} />
              <Text style={[styles.locationText,{color:'black'}]}>{publication.address}</Text>
            </View>
            <TouchableOpacity
              onPress={handleLocationPress}
              style={styles.viewMapButton}>
              <Text style={styles.viewMapText}>View on Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handlePricePress}>
          <View style={styles.priceBox}>
            <Text style={styles.contactText}>Claim!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  homeImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 10,
  },
  expandedImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  arrowText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 24,
    color: 'white',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 5,
  },
  dotInner: {
    flex: 1,
    borderRadius: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon: {
    width: 24,
    height: 24,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPrice: {
    fontSize: 16,
    color: '#888',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconBox: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  locationDescriptionBox: {
    backgroundColor: '#dddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  viewMapButton: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  viewMapText: {
    color: 'green',
    fontWeight: 'bold',
  },
  priceBox: {
    backgroundColor: '#f4a460',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Details;
