import {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {AuthContext} from './authContext';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {authUser, userId} = useContext(AuthContext);

  const sockett = io('http://localhost:5000', {
    query: {
      userId: userId, // Replace with actual user ID
    },
    transports: ['websocket'], // Ensure websocket transport is used
    secure: true, // Ensure secure connection if using https
    reconnect: true, // Enable automatic reconnection
  });
  
  sockett.on('connect', () => {
    console.log('Connected to socket server:', socket.id);
  });
  
  sockett.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
  console.log('auth', authUser)
  console.log('BABE', userId);
  useEffect(() => {
    if (authUser&&userId) {
        console.log('here in function');
      const socket = io('http://10.0.2.2:5000', {
        query: {
          userId: userId,
        },
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};