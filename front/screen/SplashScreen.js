import React, {useEffect} from 'react';
import {Image, StyleSheet, View, StatusBar} from 'react-native';
import {BlurView} from '@react-native-community/blur'; // Importez BlurView depuis '@react-native-community/blur'
// import splash from '../../assets/splash.jpg';
// import logo from '../../assets/logon.png';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SigninScreen');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BlurView style={styles.backgroundImage} blurType="light" blurAmount={70}>
        {/* <Image source={splash} style={styles.image} resizeMode="cover" /> */}

        <View style={styles.overlay} />
      </BlurView>

      {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}

      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.2)" //
        translucent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 260,
    height: 250,
    position: 'absolute',
    top: '50%',
    marginTop: -100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SplashScreen;
