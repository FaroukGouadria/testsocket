import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function EditProfile() {
  const navigation = useNavigation();
  const Profilepress = () => {
    navigation.navigate('Profile');
  };
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styless.container}>
        <View style={styless.profile}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styless.profileAvatarWrapper}>
              <View style={styless.space} />
              <Image
                alt=""
                source={{
                  uri: 'https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/395409285_2446016072245128_156046743845502556_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RHUIhzmG4sgAb7ty8vo&_nc_ht=scontent.ftun10-1.fna&oh=00_AfDeeP1NyGa98wbE4hYLgX9VsVj8E0vxK7FVyV2dy9iPtA&oe=6621BCC4',
                }}
                style={styless.profileAvatar}
              />

              <TouchableOpacity onPress={() => {}}>
                <View style={styless.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styless.profileName}>Ben mansour maram</Text>

            <Text style={styless.profileAddress}>Menzel temim , Nabeul</Text>
          </View>
        </View>
        <View style={styless.root}>
          <CustomInput
            placeholder="FullName"
            value={fullname}
            setValue={setFullname}
          />
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomButton
            bnbackgroundColor="#234B33"
            bnText="Edit"
            Press={Profilepress}
            bnColorText="white"
            bnwidth={350}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styless = StyleSheet.create({
  container: {
    padding: 0,
  },

  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 95,
    height: 95,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    maxHeight: 100,
    maxWidth: 200,
    paddingHorizontal: 30,
  },
  text: {
    marginBottom: 20,
  },
  space: {
    marginBottom: 70,
  },
  text2: {
    padding: 15,
    color: '#234B33',
    fontWeight: 'bold',
    paddingStart: 205,
    fontSize: 16,
  },
  text3: {
    textAlign: 'center',
    paddingLeft: 15,
  },
  text5: {
    textAlign: 'center',
    padding: 20,
  },
  text4: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#234B33',
    paddingRight: 90,
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
});
