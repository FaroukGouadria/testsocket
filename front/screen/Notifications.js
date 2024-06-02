import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation();

  const goBackHome = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={goBackHome}>
        <Text>Back to Home</Text>
      </TouchableOpacity>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;
