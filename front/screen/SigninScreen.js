import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomText from '../components/CustomText';
import { AuthContext } from '../../authContext';


// import logo from '../../assets/logon.png';
// import facebook from '../../assets/facebook.png';
// import google from '../../assets/google.png';

const SigninScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {height} = useWindowDimensions();
  const {token} = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      navigation.replace('HomeScreen');
    }
  }, [token, navigation]);
  
  const storeData = async (token, user) => {


    
    console.log("Loading", token, user)
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user)); // Store user object as a string
    } catch (error) {
      // Error saving data
      console.error('AsyncStorage Error: ', error.message);
    }
  };
  const forgetPress = () => {
    navigation.navigate('ForgetPassword');
  };

  const signupPress = () => {
    navigation.navigate('Details');
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.52.122:4000/login', {
        email,
        password,
      });


      const { token, user } = response.data;
      storeData(token, user);
      // await AsyncStorage.setItem('token', token); // Store the token
      Alert.alert('Success', 'User signed in successfully!');
      navigation.navigate('HomeScreen'); // Navigate to the home screen or dashboard
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* <Image
        source={logo}
        style={[styles.logo, {height: height * 0.2}]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome back, you've been missed!</Text> */}
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <CustomText
        txColorText="#234B33"
        txText="Forgot Password?"
        Press={forgetPress}
        txpaddingLeft={220}
        txpaddingTop={15}
        txpaddingBottom={15}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignin}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.styleView}>
        <Text style={styles.text3}>Don't have an account?</Text>
        <CustomText
          txColorText="#234B33"
          txText="Sign Up"
          Press={signupPress}
        />
      </View>
      <View style={styles.styleView}>
        <View style={styles.tri} />
        <Text style={styles.text5}>Or Sign In with</Text>
        <View style={styles.tri} />
      </View>
      <View style={styles.styleView2}>
        <TouchableOpacity
          style={styles.toucher}
          onPress={() => console.log('Facebook button pressed')}>
          {/* <Image source={facebook} style={styles.img} resizeMode="contain" /> */}
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toucher}
          onPress={() => console.log('Google button pressed')}>
          {/* <Image source={google} style={styles.img} resizeMode="contain" /> */}
          <Text>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    maxHeight: 80,
    maxWidth: 190,
    paddingHorizontal: 50,
    marginBottom: 20, // Increase this value to add more space
  },
  text: {
    marginBottom: 100, // Increase this value to add more space
  },
  text3: {
    textAlign: 'center',
    paddingLeft: 15,
  },
  text5: {
    textAlign: 'center',
    padding: 20,
  },
  tri: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  styleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  styleView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  toucher: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 45,
    borderWidth: 1,
    borderColor: '#234B33',
    marginRight: 5,
    borderRadius: 15,
  },
  img: {
    height: 32,
    width: 32,
    margin: 8,
  },
  btn: {
    backgroundColor: '#234B33',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SigninScreen;
