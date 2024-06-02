import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
export default function CustomButton({
  bnbackgroundColor,
  bnText,
  bnColorText,
  Press,
  bnwidth,
  bnalignItem,
}) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bnbackgroundColor,
        alignItems: bnalignItem,
        width: bnwidth,
        borderRadius: 15,
        paddingVertical: 5,
        marginVertical: 10,
        height: 48,
      }}>
      <Text
        style={{
          alignItems: 'center',
          color: bnColorText,
          fontSize: 19,
          fontWeight: 'bold',
          paddingLeft: 150,
          marginTop: 5,
        }}>
        {bnText}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#234B33',
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
