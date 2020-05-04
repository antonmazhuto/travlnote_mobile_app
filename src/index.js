import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClientOptions from './apollo';
import {AuthProvider} from './AuthContext';
import {ThemeProvider} from 'styled-components';
import NavController from './components/NavController';
import styles from './styles';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async (operation) => {
          const token = await AsyncStorage.getItem('jwt');
          return operation.setContext({
            headers: {Authorization: `Bearer ${token}`},
          });
        },
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === null || isLoggedIn === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return (
    <>
      {loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
          <ThemeProvider theme={styles}>
            <AuthProvider isLoggedIn={isLoggedIn}>
              <SafeAreaProvider>
                <NavController />
              </SafeAreaProvider>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
};

export default App;
