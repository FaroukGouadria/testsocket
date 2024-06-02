import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import logo from '../assets/h1.png';
import facebook from '../assets/h1.png';
import google from '../assets/h1.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import SigninScreen from './SigninScreen';
const SignupScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {height} = useWindowDimensions();

  const signinPress = () => {
    navigation.navigate('SigninScreen');
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.1.23:4000/signup', {
        fullname,
        address,
        email,
        password,
      });
      // Assuming the API returns some data upon successful signup
      Alert.alert('Success', 'User signed up successfully!');
      navigation.navigate('SigninScreen'); // Navigate to the home screen or dashboard
    } catch (error) {
      // Handle signup error, e.g., show an error message
      Alert.alert(
        'Error',
        error.response.data.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.root}>
      <Image
        source={logo}
        style={[styles.logo, {height: height * 0.2}]}
        resizeMode="contain"
      />

      <Text style={styles.txt}>Create account to continue</Text>
      <View style={styles.space} />
      <CustomInput
        placeholder="FullName"
        value={fullname}
        setValue={setFullname}
      />
      <CustomInput
        placeholder="Address"
        value={address}
        setValue={setAddress}
      />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.styleView}>
        <Text style={styles.text3}>Already have an account? </Text>
        <CustomText
          txColorText="#234B33"
          txText="SignIn"
          Press={signinPress}
          txpaddingRight="60"
        />
      </View>
      <View style={styles.styleView}>
        <View style={styles.tri} />
        <Text style={styles.text5}>Or SignIn with </Text>
        <View style={styles.tri} />
      </View>
      <View style={styles.styleView2}>
        <TouchableOpacity
          style={styles.toucher}
          onPress={() => console.log('Pressed')}>
          <Image source={facebook} style={styles.img} resizeMode="contain" />
          <Text>Facebook </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toucher}
          onPress={() => console.log('Pressed')}>
          <Image source={google} style={styles.img} resizeMode="contain" />
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
    paddingHorizontal: 30,
  },
  txt: {
    marginBottom: 20,
  },
  space: {
    marginBottom: 20,
  },
  text3: {
    textAlign: 'center',
    paddingLeft: 15,
  },
  text5: {
    textAlign: 'center',
    padding: 20,
    color: 'black',
    fontWeight: 'bold',
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

export default SignupScreen;
