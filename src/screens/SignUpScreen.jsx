import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CrystalButton from '../component/CrystalButton';
import CrystalButton2 from '../component/CrystalButton2';
import ShimmerImage from '../component/ShimmerImage';
import { handleRegistration } from '../services/authService';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    handleRegistration(email, password, username) // Pass the username
      .then(() => {
        navigation.navigate('Home'); // Navigate to the 'Home' screen after successful registration
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <View style={styles.backgroundColor}>
      <View style={styles.maincontainer}>
        <View style={styles.centeredContainer}>
          <ShimmerImage />
          <Text style={styles.loginText}>Create an account</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
            marginBottom={26}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            marginBottom={26}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        <CrystalButton title="Sign up" onPress={register} />

        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}>Or</Text>
        </View>

        <CrystalButton2 title="Return to Login" onPress={() => navigation.navigate('LoginScreen')} />
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
    marginBottom: 20,
  },
  image: {
    height: 220,
    width: 150,
    marginBottom: 20,
  },
  loginText: {
    marginTop: 20,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 32,
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
    borderColor: '#CDF2FA',
  },
  centeredTextContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
});

export default SignUpScreen;
