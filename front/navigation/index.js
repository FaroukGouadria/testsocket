import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigatior} from '@react-navigation/stack';
import Profile from './src/screen/Profile';
import HomeScreen from '../screen/HomeScreen';
import chat from '../screen/Chat';
import SCREENS from '../screen';
import acceuil from '../../assets/accueil.png';
const Stack = createStackNavigatior();
const Tab = createBottomTabNavigator();
const StacNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.HomeScreen}>
      <Stack.screen
        name={SCREENS.HomeScreen}
        component={HomeScreen}
        option={{headerShow: false}}
      />
      <Stack.screen
        name={SCREENS.chat}
        component={chat}
        option={{headerShow: false}}
      />
      <Stack.screen
        name={SCREENS.Profile}
        component={Profile}
        option={{headerShow: false}}
      />
      <Stack.screen
        name={SCREENS.HomeScreen}
        component={TabNavigator}
        option={{headerShow: false}}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={SCREENS.HomeScreen}>
      <Tab.Screen
        name={SCREENS.HomeScreen}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            <Image source={acceuil} style={{height: 30, width: 30}} />;
          },
        }}
      />
      <Tab.Screen
        name={SCREENS.chat}
        component={chat}
        options={{
          title: 'chat',
          tabBarIcon: ({focused}) => {
            <Image source={acceuil} style={{height: 30, width: 30}} />;
          },
        }}
      />
      <Tab.Screen
        name={SCREENS.Profile}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => {
            <Image source={acceuil} style={{height: 30, width: 30}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default StacNavigation;
