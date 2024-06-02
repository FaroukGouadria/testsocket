import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';

const FetchPublication = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Inside your component
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.199:4000/getPublication',
        );
        setPublications(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Publications endpoint not found');
          setError('Failed to fetch publications: Endpoint not found');
        } else {
          console.error('Error fetching publications:', error.message);
          setError('Failed to fetch publications');
        }
        setLoading(false);
      }
    };

    fetchPublication();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Publications</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text> // Display error message
      ) : publications.length === 0 ? (
        <Text>No publications found</Text>
      ) : (
        <FlatList
          data={publications}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.publicationItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              {/* Render other publication details as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  publicationItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default FetchPublication;
