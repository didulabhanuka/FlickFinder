import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); 
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash-animation.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text style={styles.appName}>FlickFinder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  appName: {
    marginTop: 20,
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});
