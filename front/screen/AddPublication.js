import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'; // Import Axios

// import logo from '../../assets/logon.png';
import CustomInput from '../components/CustomInput';
import TabBar from './Tabbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_URL = 'http://192.168.1.23:4001'; 

export const AddPublication = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [bathrooms, setBathrooms] = useState(null);
  const [kitchens, setKitchens] = useState(null);
  const [salon, setSalon] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [openBathrooms, setOpenBathrooms] = useState(false);
  const [openKitchens, setOpenKitchens] = useState(false);
  const [openSalon, setOpenSalon] = useState(false);
  const [openBedrooms, setOpenBedrooms] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const { height } = useWindowDimensions();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log("UserStorage", storedUser);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("UserStorage1", parsedUser?.id);
          setUserId(parsedUser.id || '');
          setUserName(parsedUser.name || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
 // Update your handleAddPublication function to ensure all required fields are included in the FormData object

 const handleAddPublication = async () => {
  try {
    const formData = new FormData();
    formData.append('address', address);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('bathrooms', bathrooms.toString()); // Ensure numbers are converted to strings
    formData.append('kitchens', kitchens.toString());
    formData.append('salon', salon.toString());
    formData.append('bedrooms', bedrooms.toString());
    formData.append('price', price.toString());
    formData.append('userId', userId);
    formData.append('userName', userName);
    // Append selected images
    selectedImages.forEach((image, index) => {
      const photo = {
        uri: image.uri,
        type: image.type || 'image/jpeg', // Default type if not specified
        name: image.fileName || `photo_${index}.jpg`, // Ensure each file has a unique name
      };
      formData.append('photos', photo);
    });
console.log(formData);
    const response = await axios.post("http://192.168.52.122:5000/addpublication", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data.data);
    Alert.alert('Success', 'Publication added successfully!');
    navigation.navigate('Details',{publicationId:response.data.data._id});
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', error.response?.data?.message || 'Something went wrong while adding the publication');
  }
};


  

  const selectImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (!response.didCancel && !response.error) {
        setSelectedImages(response.assets);
      }
    });
  };
  

  const roomOptions = Array.from({ length: 10 }, (_, i) => ({ label: `${i}`, value: i }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Image
          source={logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        /> */}

        <Text style={styles.txt}>Add your publication details</Text>
        <View style={styles.space} />
        <CustomInput
          placeholder="Address"
          value={address}
          setValue={setAddress}
                  
        />
        <CustomInput placeholder="Type" value={type} setValue={setType} />
        <CustomInput
          placeholder="Description"
          value={description}
          setValue={setDescription}
          
        />
        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Text>Baths</Text>
            <DropDownPicker
              open={openBathrooms}
              value={bathrooms}
              items={roomOptions}
              setOpen={setOpenBathrooms}
              setValue={setBathrooms}
              setItems={() => {}}
              containerStyle={styles.picker}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text>Kitchens</Text>
            <DropDownPicker
              open={openKitchens}
              value={kitchens}
              items={roomOptions}
              setOpen={setOpenKitchens}
              setValue={setKitchens}
              setItems={() => {}}
              containerStyle={styles.picker}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text>Salon</Text>
            <DropDownPicker
              open={openSalon}
              value={salon}
              items={roomOptions}
              setOpen={setOpenSalon}
              setValue={setSalon}
              setItems={() => {}}
              containerStyle={styles.picker}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text>Bedrooms</Text>
            <DropDownPicker
              open={openBedrooms}
              value={bedrooms}
              items={roomOptions}
              setOpen={setOpenBedrooms}
              setValue={setBedrooms}
              setItems={() => {}}
              containerStyle={styles.picker}
            />
          </View>
        </View>
        <CustomInput
          placeholder="Price"
          value={price}
          setValue={setPrice}
        />

        <TouchableOpacity style={styles.btn} onPress={handleAddPublication}>
          <Text style={styles.btnText}>Add Publication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={selectImages}>
          <Text style={styles.btnText}>Select Images</Text>
        </TouchableOpacity>
        {selectedImages.length > 0 && (
          <View style={styles.imagesContainer}>
            {selectedImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.image}
              />
            ))}
          </View>
        )}
        <View style={styles.styleView}></View>
      </ScrollView>
      <View style={styles.tabBarContainer}>
        <TabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  picker: {
    width: 100,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#234B33',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  styleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default AddPublication