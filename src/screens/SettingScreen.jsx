import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { handleUpLoadOfImage } from '../services/BucketService'; // Ensure the correct path to BucketService
import CrystalButton from '../component/CrystalButton';
import { handleLogout } from '../services/authService';
import CrystalButton3 from '../component/CrystalButton3';

const SettingScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null); // For displaying the uploaded image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
            setEmail(user.email);
            setImageUri(userDoc.data().imageUrl || null); // Set the image URL if it exists
          }
        } else {
          console.log("No user logged in.");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const user = auth.currentUser;
    if (user && image) {
      const fileName = `${user.uid}_${Date.now()}`;
      await handleUpLoadOfImage(user.uid, image, fileName);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setImageUri(userDoc.data().imageUrl || null); // Set the image URL if it exists
        setImage(null); // Clear the selected image to hide the preview
      }
    } else {
      alert("Please select an image.");
    }
  };

  const handleNavigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  const onLogout = () => {//Move to settings screen and replace with profile image
    handleLogout()
      .then(() => {
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={handleNavigateToHomeScreen}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
            <CrystalButton3 title="Sign Out" onPress={onLogout} />
          </View>
      </View>
      <View style={styles.maincontainer}>
        <View style={styles.box1}>
          <Image
            style={styles.tinyLogo}
            source={imageUri ? { uri: imageUri } : require('../../assets/profile.jpg')}
          />

          <CrystalButton title="Pick an image from camera roll" onPress={pickImage} />
          {image && !imageUri && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity
            style={[styles.button, !image && styles.buttonDisabled]}
            onPress={uploadImage}
            disabled={!image}
          >
            <Text style={styles.buttonText}>Save Image</Text>
          </TouchableOpacity>

          <View style={styles.innerBox}>
            <Text style={[styles.heading2, { paddingBottom: 5 }]}>
              {`Username: ${username}`}
            </Text>
            <Text style={[styles.heading2, { paddingBottom: 5 }]}>
              {`Email: ${email}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#AD91F6",
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Ensure header stays above scroll content
    backgroundColor: "#AD91F6",
    paddingTop: 45,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  box1: {
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading2: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add marginBottom to separate the profile from the description
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100, // Half of the width and height to make it circular
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100, // Half of the width and height to make it circular
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
    borderWidth: 3,
    borderColor: '#CDF2FA', // Fantasy-themed border color
    backgroundColor: '#745BB6', // Your button color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: 'hidden',
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30
  },
  buttonContainer: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
});

export default SettingScreen;
