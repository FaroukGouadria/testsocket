import React, {createContext, useState, useEffect} from 'react';
import {register} from '../../Api/controllers/UserController.cjs';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [error, setError] = useState('');

  const register = async (fullname, email, password, navigation) => {
    try {
      const {data} = await client.post(
        '/register',
        {
          fullname,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      console.log(data);

      if (data.success) {
        let userInfo = data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        navigation.replace('login');
      } else {
        alert(data.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      console.log('register error ${e}');
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const {data} = await client.post(
        '/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (data.success) {
        let userInfo = data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      } else {
        setError(data.message);
        setIsLoading(false);
      }

      console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        error,
        register,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
