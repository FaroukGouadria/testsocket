import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
  } from 'react-native';
  import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Entypo from 'react-native-vector-icons/Entypo';
  import Feather from 'react-native-vector-icons/Feather';
  import axios from 'axios';
  import { useSocketContext } from '../../SocketContext';
  import { AuthContext } from '../../authContext';
  
  const ChatRoom = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { token, userId } = useContext(AuthContext);
    const { socket } = useSocketContext();
    const route = useRoute();
    const { publication } = route.params;
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            <View>
              <Text style={{ color: 'black' }}>{publication?.userName}</Text>
            </View>
          </View>
        ),
      });
    }, [navigation, publication]);
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const senderId = userId;
          const receiverId = publication?.userId;
  
          const response = await axios.get('http://192.168.52.122:4000/messages', {
            params: { senderId, receiverId },
          });
  
          setMessages(response.data);
        } catch (error) {
          console.log('Error fetching messages', error);
        }
      };
  
      fetchMessages();
    }, [userId, publication]);
  
    useEffect(() => {
      socket?.on('newMessage', (newMessage) => {
        console.log('New message', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
  
      return () => {
        socket?.off('newMessage');
      };
    }, [socket,message]);
  
    const sendMessage = async () => {
      const senderId = userId;
      const receiverId = publication?.userId;
  
      if (!message.trim()) return;
  
      try {
        await axios.post('http://192.168.52.122:4000/sendMessage', {
          senderId,
          receiverId,
          message,
        });
  
        socket.emit('sendMessage', { senderId, receiverId, message });
        setMessage('');
      } catch (error) {
        console.log('Error sending message', error);
      }
    };
  
    const formatTime = (time) => {
      const options = { hour: 'numeric', minute: 'numeric' };
      return new Date(time).toLocaleString('en-US', options);
    };
  
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {messages.map((item, index) => (
            <Pressable
              key={index}
              style={[
                item?.senderId === userId
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={{ fontSize: 13, textAlign: 'left' }}>{item?.message}</Text>
              {/* {!isNaN(Date.parse(item?.timeStamp)) && (
      <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 4 }}>
        {formatTime(item?.timeStamp)}
      </Text>
            )} */}
            </Pressable>
          ))}
        </ScrollView>
  
        <View style={styles.inputContainer}>
          <Entypo name="emoji-happy" size={24} color="gray" />
          <TextInput
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
          />
          <View style={styles.iconContainer}>
            <Entypo name="camera" size={24} color="gray" />
            <Feather name="mic" size={24} color="gray" />
          </View>
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    textInput: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderRadius: 20,
      borderColor: '#ddd',
      borderWidth: 1,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    sendButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
  });
  
  export default ChatRoom;
  