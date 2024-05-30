import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import CrystalButton3 from '../component/CrystalButton3';
import { handleLogout } from '../services/authService';
import { db } from '../../firebase';
import Logo from '../../assets/Logo.png';
import write from '../../assets/write.jpg';
import { auth } from '../../firebase';
import { doc, collection, getDoc, getDocs } from "firebase/firestore";


const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        } else {
          console.log("No user logged in.");
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionSnapshot = await getDocs(collection(db, 'competition'));
        const competitionList = competitionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCompetitions(competitionList);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
    fetchCompetitions();
  }, []);

  const onLogout = () => {
    handleLogout()
      .then(() => {
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
            <CrystalButton3 title="Sign Out" onPress={onLogout} />
          </View>
        </View>

        <View style={styles.box1}>
          <View style={styles.paddingbottom}>
            <Text style={[styles.heading2, { paddingBottom: 5 }]}>
              {`Welcome' ${username} to`}
            </Text>
            <Text style={styles.heading1} paddingBottom={5}>EnchantedReviews</Text>
            <Text style={styles.body} paddingBottom={5}>Here we host competitions that are anything involving a fantasy genre.</Text>
          </View>
        </View>

        <Text style={styles.headings2}>Competitions</Text>
        {competitions.map((competition) => (
          <TouchableOpacity
            key={competition.id}
            style={styles.card}
            onPress={competition.title === "Book review competition" ? handleNavigateToCompetitionScreen : undefined}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image2}
                source={{ uri: competition.imageURL }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2} paddingBottom={5}>{competition.title}</Text>
            <Text style={styles.body3}>Begins at: {competition.opendate}</Text>
            <Text style={styles.body3}>Ends at: {competition.closedate}</Text>
          </TouchableOpacity>
        ))}


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
    textAlign: 'center',
    color: 'white',
  },
  heading2: {
    marginLeft: 10,
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 20,
    textAlign: 'center',
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
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width: 320,
    height: 220,
    borderRadius: 20,
  }
});

export default HomeScreen;
