import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  input: {},
});
export default CustomInput;
