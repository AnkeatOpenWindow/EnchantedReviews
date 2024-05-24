import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import book1 from '../../assets/book1.png';
import profile from '../../assets/profile.jpg';
import CrystalButton3 from '../component/CrystalButton3';

const ReviewScreen = ({ navigation }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleNavigateToDetail = () => {
    navigation.navigate('Details');
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <View style={styles.back}>
            <TouchableOpacity onPress={handleNavigateToDetail}>
              <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.share}>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={32} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.maincontainer}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image2}
                source={book1}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2}>Fourth Wing</Text>
            <Text style={styles.body3}>Rebecca Yarros | 2023</Text>

            <View style={styles.genre}>
              <Text style={styles.genreText}>Fantasy</Text>
              <Text style={styles.genreText}>Adventure</Text>
              <Text style={styles.genreText}>Drama</Text>
              <Text style={styles.genreText}>Romance</Text>
              <Text style={styles.genreText}>Thriller</Text>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>

          <View style={styles.box1} marginTopTop={20}>
            <View style={styles.paddingbottom}>
              <Text style={styles.heading1} paddingBottom={20}>Description</Text>
              <Text style={styles.body} paddingBottom={10}>
                A young scribe is thrust into an elite war college for dragon riders where the only rule is graduate or perish. An addictive fantasy with epic levels of spice and world-building. Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history.
              </Text>
            </View>
          </View>

          <View style={styles.horizontalLine}></View>

          <View style={styles.rowContainer}>
            <Text style={styles.heading1}>Reviews</Text>
            <View style={styles.add}>
              <CrystalButton3 title="Save" />
            </View>
          </View>

          <View style={styles.box1} marginTopTop={20}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.tinyLogo}
                source={profile}
              />
              <Text style={styles.username}>Username</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Put in your review"
              placeholderTextColor="white"
              marginBottom={26}
            />


          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollView: {
    flexGrow: 1,
    paddingTop: 100,
    marginHorizontal: 20,
    paddingBottom: 20, // Adjust for the space below the content
  },
  maincontainer: {
    alignItems: 'center', // Center the card horizontally
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading1: {
    fontFamily: 'ModernAntiquaRegular',
    fontSize: 19,
    color: 'white',
  },
  body: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
  },
  body2: {
    fontSize: 19,
    color: 'white',
    marginTop: 10, // Space between the image and the title
  },
  body3: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginTop: 5, // Space between the title and the author
  },
  share: {
    marginLeft: 300, // Your styles for the share button container
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center', // Center the content of the card
    width: '90%',
  },
  imageContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  image2: {
    width: 320,
    height: 220,
    borderRadius: 20,
  },
  genre: {
    width: 300, // Set a specific width for the genre container
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow the genre texts to wrap to the next line
    marginTop: 10, // Add space between the author and the genre tags
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  genreText: {
    fontSize: 12,
    color: 'white',
    padding: 14,
    backgroundColor: "#745BB6",
    borderRadius: 7,
    marginRight: 10, // Add space between the genre tags
    marginBottom: 10, // Add space between lines of wrapped tags
  },
  horizontalLine: {
    width: '100%', // Ensure the line fits within the card's width
    height: 2,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  box1: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    width: '100%' // Removed the extra space after 100%
  },
  add: {
    marginLeft: 140, // Your styles for the share button container
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add marginBottom to separate the profile from the description
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100, // Half of the width and height to make it circular
  },
  username: {
    marginLeft: 10, // Add margin to create space between the profile image and username
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  reviewDescription: {
    color: 'white',
    fontSize: 16,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewScreen;
