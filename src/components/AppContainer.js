import React, {memo} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import {Header} from './Header';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  sub: {
    flex: 1,
    justifyContent: 'center',
  },
});

const AppContainer = memo(
  ({
    flatlist = false,
    iconLeft = null,
    onPress = null,
    onPressRight = null,
    colorLeft = '#000e31',
    iconRight,
    colorRight = '#000e31',
    children,
    message = '',
    title,
    loading = false,
  }) => {
    const {container, sub} = styles;
    return (
      <SafeAreaView style={container}>
        {title && (
          <Header
            title={title}
            onPress={onPress}
            onPressRight={onPressRight}
            iconLeft={iconLeft}
            colorLeft={colorLeft}
            colorRight={colorRight}
            iconRight={iconRight}
          />
        )}
        <>
          {loading ? (
            ''
          ) : (
            <>
              {!flatlist ? (
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                  <View style={sub}>{children}</View>
                </ScrollView>
              ) : (
                <>
                  <View style={sub}>{children}</View>
                </>
              )}
            </>
          )}
        </>
      </SafeAreaView>
    );
  },
);

export {AppContainer};
