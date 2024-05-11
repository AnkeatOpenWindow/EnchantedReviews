import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CrystalButton from '../component/CrystalButton';
import Logo from '../../assets/Logo.png'; // Adjust the path as per your actual folder structure


const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.backgroundColor}>
      <View style={styles.maincontainer}>
        <View style={styles.centeredContainer}>
          <Image
            style={styles.image}
            source={Logo}
            resizeMode="contain" // Adjust resizeMode based on your requirements
          />
          <Text style={styles.loginText}>Login</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white" // Set the placeholder text color
            value={username}
            onChangeText={setUsername}
            marginBottom={26}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white" // Set the placeholder text color
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Buttons */}
        <CrystalButton title="Login" onPress={() => navigation.navigate('HomeTabNavigator')} />
        
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}>Or</Text>
        </View>
        
        <CrystalButton title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: "#AD91F6",
  },
  maincontainer: {
    marginTop: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  centeredContainer: {
    alignItems: 'center',
    marginBottom: 20, // Adjust the space between the image and the button as needed
  },
  image: {
    height: 220,
    width: 150,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 66,
  },
  input: {
    color:'white',
    backgroundColor: '#745BB6',
    padding: 10,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CDF2FA', // Fantasy-themed border color
  },
  centeredTextContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
    // You can add additional styles for the text if needed
  },
  loginText: {
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 32, // Adjust the font size as needed
  },
});

export default LoginScreen;
