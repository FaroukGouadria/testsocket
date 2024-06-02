import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const claims = [
  {
    id: 'CLM001',
    message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    date: '2024-05-18',
  },
  {
    id: 'CLM002',
    message:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-05-17',
  },
  {
    id: 'CLM002',
    message:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-05-17',
  },
  {
    id: 'CLM002',
    message:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024-05-17',
  },
  // Add more claim objects as needed
];

export default function MyClaims() {
  const [value, setValue] = React.useState(0);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View style={styles.container}>
        <Text style={styles.title}>My Claims</Text>

        {claims.map(({id, message, date}, index) => {
          const isActive = value === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setValue(index);
              }}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <View style={styles.radioTop}>
                  <Text style={styles.radioLabel}>Claim ID: {id}</Text>
                </View>

                <Text style={styles.radioMessage}>{message}</Text>
                <Text style={styles.radioDate}>Date: {date}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Radio */
  radio: {
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: '#006400',
  },
  radioTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  radioMessage: {
    fontSize: 15,
    fontWeight: '400',
    color: '#848a96',
    marginBottom: 4,
  },
  radioDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2f2f2f',
  },
});
