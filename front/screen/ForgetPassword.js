import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ForgetPassword = () => {
  const signinPress = () => {
    navigation.navigate('SigninScreen');
  };
  const navigation = useNavigation();
  const [useremail, setemail] = useState('');

  const {height} = useWindowDimensions();

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.text2}>Forgot Password</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>Please Enter your email to reset password</Text>
      </View>

      <CustomInput placeholder="Email" value={useremail} setValue={setemail} />
      <CustomButton
        bnbackgroundColor="#234B33"
        bnText="Send"
        bnColorText="white"
        bnwidth={350}
        Press={signinPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop: 150,
  },
  text2: {
    color: '#234B33',
    fontWeight: 'bold',
    fontSize: 23,
  },

  textContainer: {
    flexDirection: 'row', // Display text in the same line
    alignItems: 'center', // Center text vertically in the container
    marginTop: 10, // Add margin top for spacing
    width: '100%', // Ensure text takes full width of the container
  },
});
export default ForgetPassword;
