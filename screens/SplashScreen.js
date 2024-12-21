import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity set to 0
  const scaleAnim = new Animated.Value(0.7); // Initial scale set to 0.7

  useEffect(() => {
    // Fade in and scale up the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Home'); // After 2 seconds, navigate to the Home screen
    }, 2500); // Giving more time for animation to complete
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/splash_image.png')} style={styles.image} />
        <Text style={styles.text}>MovieApp</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 10, // Adding rounded corners for a more polished look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Adding shadow to give the image a floating effect
  },
  text: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Helvetica Neue', // Clean, modern font for a professional look
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default SplashScreen;