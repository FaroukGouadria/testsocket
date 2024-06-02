import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Chat from './Chat';
import Favoris from './Favoris';

// Screen names
const HomeName = 'Home';
const ChatName = 'Chat';
const ProfileName = 'Profile';
const FavorisName = 'Favoris';

const Tab = createBottomTabNavigator();

function MainContainer() {
  const [selectedTab, setSelectedTab] = useState(HomeName);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={HomeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            const routeName = route.name;

            if (routeName === HomeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === ChatName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (routeName === FavorisName) {
              iconName = focused ? 'favoris' : 'heart-outline';
            } else if (routeName === ProfileName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: {paddingBottom: 10, fontSize: 10},
          style: {padding: 10, height: 70},
        }}>
        <Tab.Screen
          name={HomeName}
          component={HomeScreen}
          listeners={{
            tabPress: () => setSelectedTab(HomeName),
          }}
        />
        <Tab.Screen
          name={ChatName}
          component={Chat}
          listeners={{
            tabPress: () => setSelectedTab(ChatName),
          }}
        />
        <Tab.Screen
          name={FavorisName}
          component={Favoris}
          listeners={{
            tabPress: () => setSelectedTab(FavorisName),
          }}
        />
        <Tab.Screen
          name={ProfileName}
          component={Profile}
          listeners={{
            tabPress: () => setSelectedTab(ProfileName),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
