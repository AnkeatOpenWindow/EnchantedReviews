import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogin } from '../services/authService';
import CrystalButton from '../component/CrystalButton';
import CrystalButton2 from '../component/CrystalButton2';
import ShimmerImage from '../component/ShimmerImage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error message

  const login = () => {
    handleLogin(email, password)
      .then((result) => {
        if (result.success) {
          // Navigate to another screen upon successful login if needed
          navigation.navigate('Home');
        } else {
          // Handle login failure
          setError(result.error);
          Alert.alert('Sorry your email/password is concorect, please try again'); // Optional: show an alert
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setError('An error occurred. Please try again.'); // Handle unexpected errors
      });
  };



  return (
      <View style={styles.backgroundColor}>
        <View style={styles.maincontainer}>
          <View style={styles.centeredContainer}>
            <ShimmerImage />
            <Text style={styles.loginText}>Login</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="white" 
              defaultValue={email}
              onChangeText={newText => setEmail(newText)}
              marginBottom={26}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Password"
              placeholderTextColor="white" // Set the placeholder text color
              secureTextEntry={true}
              defaultValue={password}
              onChangeText={newText => setPassword(newText)}
            />
          </View>

          {/* Buttons */}
          <CrystalButton title="Login" onPress={login} />

          <View style={styles.centeredTextContainer}>
            <Text style={styles.centeredText}>Or</Text>
          </View>

          <CrystalButton2 title="Create an account" onPress={() => navigation.navigate('SignUpScreen')} />
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
    color: 'white',
    backgroundColor: '#745BB6',
    paddingLeft: 30,
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
    marginTop: 20,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 32, // Adjust the font size as needed
  },
});

export default LoginScreen;
