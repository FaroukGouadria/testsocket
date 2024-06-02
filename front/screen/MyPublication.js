import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import img1 from '../../assets/mypub1.png';
// import img2 from '../../assets/mypub2.png';
// import img3 from '../../assets/mypub3.png';

const items = [
  {
    // img: img1,
    type: 'House',
    tdn: 'TDN',
    description: 'Beautiful family home with spacious rooms and garden.',
    location: 'New York, USA',
    date: new Date('2022-10-20'),
  },
  {
    // img: img2,
    type: 'Apartment',
    tdn: 'TDN',
    description: 'Modern apartment with stunning city views.',
    location: 'Los Angeles, CA',
    date: new Date('2022-11-22'),
  },
  {
    // img: img3,
    type: 'Villa',
    tdn: 'TDN',
    description: 'Luxurious villa with pool and beach access.',
    location: 'Miami, FL',
    date: new Date('2022-11-23'),
  },
];

export default function MyPublication() {
  return (
    <SafeAreaView style={{backgroundColor: '#f2f2f2'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Publications</Text>

        {items.map(({img, type, tdn, description, location, date}, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => {}}>
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  {/* <Image
                    alt=""
                    resizeMode="cover"
                    style={styles.cardImg}
                    source={img}
                  /> */}
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{type}</Text>

                    <Text style={styles.cardPrice}>{tdn}</Text>
                  </View>

                  <Text style={styles.cardDescription}>{description}</Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardLocation}>{location}</Text>

                    <Text style={styles.cardDate}>
                      {date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  /** Card */
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLocation: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
});
