import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Logo from '../../assets/Logo.png';

const GlassEffectImage = () => {
  return (
    <View style={styles.glassWrapper}>
      <Image
        style={styles.image}
        source={Logo}
        resizeMode="contain" // Adjust resizeMode based on your requirements
      />
      <View style={styles.glassOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  glassWrapper: {
    position: 'relative',
    height: 220,
    width: 150,
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
    borderRadius: 10, // Adjust based on your design
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Slightly more opaque border
    backdropFilter: 'blur(10px)', // Apply blur effect
  },
});

export default GlassEffectImage;
