import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Appbar, Switch} from 'react-native-paper'; // Assuming you're using react-native-paper for icons and UI components
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from './Tabbar';


const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          'http://192.168.1.23:4000/profile',
          config,
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        // Handle error gracefully, e.g., show an error message
      }
    };

    fetchUserProfile();
  }, []);

  const handleToggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    // Implement logic to switch between dark and light mode
  };

  const handleLogout = async () => {
    // Add your logout logic here
    await AsyncStorage.removeItem('token');
    console.log('User logged out');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      {user ? (
        <View style={styles.profileContainer}>
          <Avatar.Image
            source="https://i.pinimg.com/564x/19/6d/a5/196da5e3d4addcc30ce12d407662df81.jpg"
            size={100}
          />
          <TouchableOpacity
            style={styles.modifyIcon}
            onPress={() => console.log('Modify Avatar')}>
            {/* Add modify icon component */}
          </TouchableOpacity>
          <Text>{user.fullname}</Text>
          <Text>{user.email}</Text>
          <View style={styles.listItem}>
            {/* Dark/Light Mode */}
            <Text style={styles.listItemText}>Dark/Light Mode</Text>
            <Switch value={isDarkMode} onValueChange={handleToggleSwitch} />
          </View>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('Edit Profile')}>
            {/* Edit Profile */}
            <Text style={styles.listItemText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('Downloaded')}>
            {/* Downloaded */}
            <Text style={styles.listItemText}>Downloaded</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('My Publications')}>
            {/* My Publications */}
            <Text style={styles.listItemText}>My Publications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => console.log('My Claims')}>
            {/* My Claims */}
            <Text style={styles.listItemText}>My Claims</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
            {/* LOG OUT */}
            <Text style={styles.listItemText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
      <TabBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    flex: 1,
    marginLeft: 10,
  },
  modifyIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
});

export default ProfileScreen;
