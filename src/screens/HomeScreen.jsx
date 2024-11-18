import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { db, auth } from '../../firebase'; // Ensure correct imports
import Logo from '../../assets/Logo.png';
import { doc, collection, getDocs, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user logged in.");
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username);
        setImageUri(doc.data().imageUrl || null);
      } else {
        console.log("User document does not exist.");
        setUsername('');
        setImageUri(null);
      }
    });

    return () => unsubscribe();
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

  const handleNavigateToCompetitionScreen = (competitionTitle) => {
    navigation.navigate('Competition', { title: competitionTitle });
  };

  const handleNavigateToSettingsScreen = () => {
    navigation.navigate('Profile');
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
          <View >
            <TouchableOpacity onPress={handleNavigateToSettingsScreen}>
              <Image
                style={styles.tinyLogo}
                source={imageUri ? { uri: imageUri } : require('../../assets/profile.jpg')}
              />
            </TouchableOpacity>
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
        {competitions.map((competition) => {
          const isClosed = competition.title === "Gaming review competition";
          return (
            <TouchableOpacity
              key={competition.id}
              style={styles.card}
              onPress={() => !isClosed && handleNavigateToCompetitionScreen(competition.title)}
              disabled={isClosed}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image2}
                  source={{ uri: competition.imageURL }}
                  resizeMode="contain"
                />
                {isClosed && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Coming Soon</Text>
                  </View>
                )}
              </View>
              <Text style={styles.body2} paddingBottom={5}>{competition.title}</Text>
              <Text style={styles.body3}>Begins at: {competition.opendate}</Text>
              <Text style={styles.body3}>Ends at: {competition.closedate}</Text>
            </TouchableOpacity>
          );
        })}
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
    paddingTop: 25,
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image2: {
    width: 320,
    height: 220,
    borderRadius: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100, // Half of the width and height to make it circular
    marginBottom: 10,
    marginLeft: 120,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
