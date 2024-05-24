import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import CrystalButton3 from '../component/CrystalButton3';
import Logo from '../../assets/Logo.png';
import write from '../../assets/write.jpg';

const HomeScreen = ({ navigation }) => {

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const handleNavigateToCompetitionScreen = () => {
    navigation.navigate('Competition');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.maincontainer}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={Logo}
            resizeMode="contain"
          />
          <Text style={styles.heading6}>EnchantedReviews</Text>
          <View style={styles.buttonContainer}>
            <CrystalButton3 title="Sign Out" onPress={handleLogout} />
          </View>
        </View>

        <View style={styles.box1}>
          <View style={styles.paddingbottom}>
            <Text style={styles.heading2} paddingBottom={5}>Welcome to:</Text>
            <Text style={styles.heading1} paddingBottom={5}>EnchantedReviews'</Text>
            <Text style={styles.heading2} paddingBottom={10}>Homepage</Text>
            <Text style={styles.body} paddingBottom={5}>Here we host competitions that is anything involving a fantasy genre.</Text>
          </View>
        </View>

        <Text style={styles.headings2}>Competitions</Text>
        <TouchableOpacity style={styles.card} onPress={handleNavigateToCompetitionScreen}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image2}
              source={write}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.body2} paddingBottom={5}>Book review competition</Text>
          <Text style={styles.body3}>Open till: 14 June 2024</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#AD91F6",
  },
  maincontainer: {
    marginTop: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading1: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 24,
    textAlign: 'center', // Center text
    color: 'white',
  },
  heading2: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 20,
    textAlign: 'center', // Center text
    color: 'white',
  },
  headings2: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 20,

  },
  heading6: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 14,
  },
  body: {
    fontSize: 14,
    textAlign: 'center', // Center text
    color: 'white',
  },
  body2: {
    fontSize: 16,
    paddingLeft: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  body3: {
    fontSize: 13,
    paddingLeft: 20,
    color: 'white',
  },
  image: {
    height: 100,
    width: 40,
  },
  buttonContainer: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  box1: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    // add box shaddow later
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,

  },
  imageContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  image2: {
    width: 320,
    height: 220,
    borderRadius: 20,
  }

});

export default HomeScreen;
