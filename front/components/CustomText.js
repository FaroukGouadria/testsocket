import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
export default function CustomText({
  txbackgroundColor,
  txText,
  txColorText,
  Press,
  txwidth,
  txalignItem,
  txpaddingRight,
  txpaddingLeft,
  txpaddingTop,
  txpaddingBottom,
}) {
  return (
    <TouchableOpacity onPress={Press}>
      <Text
        style={{
          color: txColorText,
          fontSize: 15,
          fontWeight: 'bold',
          paddingRight: txpaddingRight,
          paddingLeft: txpaddingLeft,
          paddingTop: txpaddingTop,
          paddingBottom: txpaddingBottom,
        }}>
        {txText}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: '#234B33',
  },
});
