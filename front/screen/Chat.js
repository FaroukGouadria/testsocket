import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../authContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 10 }}>Back</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://192.168.52.122:4000/conversations/${userId}`);
        console.log("responseResponse", response.data)
        const conversationsWithUserDetails = await Promise.all(response.data.map(async (conversation) => {
          const userResponse = await axios.get(`http://192.168.52.122:4000/users/${conversation.userId}`);
          console.log("userResponse", userResponse.data)
          return {
            ...conversation,
            userName: userResponse.data.name,
            userImage: userResponse.data.image,
          };
        }));
        setConversations(conversationsWithUserDetails);
        console.log("response: " + JSON.stringify(conversationsWithUserDetails));
      } catch (error) {
        console.log('Error fetching conversations', error);
      }
    };

    fetchConversations();
  }, [userId]);

  const handleConversationPress = (conversation) => {
    navigation.navigate('ChatRoom', { publication: conversation });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => handleConversationPress(item)}
          >
            <Image source={{ uri:"https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg"  }} style={styles.userImage} />
            <View>
              <Text style={styles.conversationText}>{item.userName||"farouk"}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  conversationText: {
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },
});

export default Chat;
