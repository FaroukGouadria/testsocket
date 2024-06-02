import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import SigninScreen from './SigninScreen';
// import home1 from '../../assets/home1.png';
// import home2 from '../../assets/home2.png';
// import home3 from '../../assets/home3.png';

const OnboardingScreen = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const navigation = useNavigation();

  const handleIndexChanged = index => {
    setActiveDotIndex(index);
    if (index === 2) {
      setTimeout(() => {
        navigation.navigate('SigninScreen');
      }, 2000);
    }
  };

  const renderOnboardingScreen = (
    imageSource,
    welcomeText,
    descriptionText,
  ) => {
    return (
      <View>
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>{welcomeText}</Text>
          <Text style={styles.descriptionText}>{descriptionText}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        index={0}
        style={styles.wrapper}
        paginationStyle={styles.pagination}
        onIndexChanged={handleIndexChanged}>
        <View style={styles.slide}>
          {renderOnboardingScreen(
            'Welcome to Homie!',
            "Let's find your perfect place to call home.",
          )}
        </View>
        <View style={styles.slide}>
          {renderOnboardingScreen(
            'Homie: Your Real Estate Partner',
            'Where safety and trust meet every step.',
          )}
        </View>
        <View style={styles.slide}>
          {renderOnboardingScreen(
            'Your Safe Haven',
            'Navigating real estate with peace of mind',
          )}
        </View>
      </Swiper>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, activeDotIndex === 0 && styles.activeDot]} />
        <View style={[styles.dot, activeDotIndex === 1 && styles.activeDot]} />
        <View style={[styles.dot, activeDotIndex === 2 && styles.activeDot]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    bottom: 30,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#234B33',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 66,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
});

export default OnboardingScreen;
