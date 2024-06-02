import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const { width } = Dimensions.get('window');

const TabBar = ({ state, descriptors}) => {
    const navigation = useNavigation();
  const [iconScales, setIconScales] = useState({
    home: new Animated.Value(1),
    search: new Animated.Value(1),
    add: new Animated.Value(1),
    favorite: new Animated.Value(1),
    person: new Animated.Value(1),
  });

  const handleIconPress = (iconName, screenName) => {
    const animationSequence = Animated.sequence([
      Animated.timing(iconScales[iconName], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(iconScales[iconName], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]);

   
  };
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const animatedIconStyle = (iconName) => ({
    transform: [{ scale: iconScales[iconName] }],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Your app content goes here */}
      </View>
      <View style={styles.tabBarContainer}>
        <View style={styles.curvedBackground}>
          <View style={styles.tabBar}>
            {/* Left icons */}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigateToScreen('HomeScreen')}
            >
              <Animated.View style={animatedIconStyle('home')}>
                <Image source={require('../assets/h1.png')} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigateToScreen('Profile')}
            >
              <Animated.View style={animatedIconStyle('person')}>
                <Image source={require('../assets/h1.png')} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>

            {/* Center add button */}
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => navigateToScreen('AddPublication')}
            >
              <Animated.View style={[styles.addButton, animatedIconStyle('add')]}>
                <Image source={require('../assets/h1.png')} style={styles.addIcon} />
              </Animated.View>
            </TouchableOpacity>

            {/* Right icons */}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigateToScreen('FavoriteList')}
            >
              <Animated.View style={animatedIconStyle('favorite')}>
                <Image source={require('../assets/h1.png')} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigateToScreen('Chat')}
            >
              <Animated.View style={animatedIconStyle('search')}>
                <Image source={require('../assets/h1.png')} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,

    // Add your app content styles here
  },
  tabBarContainer: {
    height: 80,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    elevation: 8,
  },
  curvedBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: width - 32,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  icon: {
    width: 25,
    height: 25,
  },
  addButtonContainer: {
    backgroundColor: '#234B33',
    borderRadius: 30,
    padding: 12,
    elevation: 8,
  },
  addButton: {
    backgroundColor: '#234B33',
    borderRadius: 24,
    padding: 8,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default TabBar;
