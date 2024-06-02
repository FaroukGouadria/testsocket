import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, useState, useEffect} from 'react';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState(
    AsyncStorage.getItem('token') || null,
  );
  console.log("BABE AU",token)
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("token",token)
    //   const decodedToken = jwtDecode(token);
      setToken(token);
      const storedUser = await AsyncStorage.getItem('user');
      console.log("user",storedUser)
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser?._id;
      console.log("user fil context==>",userId)
      console.log("userId",userId)
      console.log("authUser",authUser)
      setUserId(userId);
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{token, userId, setToken, setUserId,authUser,setAuthUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};