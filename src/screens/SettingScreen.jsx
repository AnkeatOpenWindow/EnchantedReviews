import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../assets/profile.jpg';

const SettingScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
            setEmail(user.email);
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


  const handleNavigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={handleNavigateToHomeScreen}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.maincontainer}>
        <View style={styles.box1}>
          <Image
            style={styles.tinyLogo}
            source={profile}
          />
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
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100, // Half of the width and height to make it circular
  },
});

export default SettingScreen;
