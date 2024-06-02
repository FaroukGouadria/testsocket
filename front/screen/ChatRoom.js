import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { AuthContext } from '../../authContext';
import { useSocketContext } from '../../SocketContext';

const ChatRoom = () => {
  const navigation = useNavigation();
  const { token, userId, setToken, setUserId } = useContext(AuthContext);
  const { socket } = useSocketContext();
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { publication } = route.params;
const scrollViewRef=useRef()
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);
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
  const listeMessages = () => {
    

    useEffect(() => {
      socket?.on('newMessage', newMessage => {
          console.log("newMessage",newMessage);
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => socket?.off('newMessage');
    }, [socket, messages, setMessages]);
  };

  listeMessages();
  const sendMessage = async (senderId, receiverId) => {
      console.log("Sent",senderId, receiverId, message)
    try {
      await axios.post('http://192.168.52.122:4000/sendMessage', {
        senderId,
        receiverId,
        message,
      });
      console.log("Sent",senderId, receiverId, message)
      socket.emit('sendMessage', {senderId, receiverId, message});

      setMessage('');

      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log('Error', error);
    }
  };
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = publication?.userId;

      const response = await axios.get('http://192.168.52.122:4000/messages', {
        params: {senderId, receiverId},
      });

      setMessages(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  console.log('messages', messages);
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView ref={scrollViewRef}>
        {messages?.map((item, index) => {
          const isSender = item?.senderId?._id === userId;
          return (
            <View key={index} style={{
              flexDirection: 'row',
              justifyContent: isSender ? 'flex-end' : 'flex-start',
              alignSelf: isSender ? 'flex-end' : 'flex-start',
            }}>
              {!isSender && (
                <Image
                  source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/011/459/666/small_2x/people-avatar-icon-png.png" }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    marginRight: 10,
                  }}
                />
              )}
              <View style={{
                maxWidth: '70%',
                backgroundColor: isSender ? '#FFEEE6' : '#BDD1FA',
                borderRadius: 7,
                padding: 8,
                margin: 10,
              }}>
                <Text style={{ fontSize: 15, textAlign: "left", color: "black" }}>{item?.message}</Text>
                {!isNaN(Date.parse(item?.timeStamp)) && (
                  <Text style={{ textAlign: 'right', fontSize: 11, color: 'black', marginTop: 4 }}>
                       {!isNaN(Date.parse(item?.timeStamp)) ? (
      <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 4 }}>
        {formatTime(item?.timeStamp)}
      </Text>
            ):(  <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 4 }}>
            "A l'instant"
          </Text>)}
                  </Text>
                )}
              </View>
              {isSender && (
                <Image
                  source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/011/459/666/small_2x/people-avatar-icon-png.png" }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    marginLeft: 10,
                  }}
                />
              )}
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 20,
        }}>
        <Entypo name="emoji-happy" size={24} color="gray" />
        <TextInput
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginLeft: 10,
          }}
        />
        <Pressable
          onPress={() => sendMessage(userId, publication?.userId)}
          style={{
            backgroundColor: '#0066b2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
