import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem('jwt', token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const setLogUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider value={{isLoggedIn, logUserIn, setLogUserOut}}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useIsLoggedIn = () => {
//     const isLoggedIn = useContext(AuthContext);
//   return isLoggedIn
// };
//
export const useLogIn = () => {
  const {logUserIn} = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const {setLogUserOut} = useContext(AuthContext);
  return setLogUserOut;
};
