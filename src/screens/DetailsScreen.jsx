import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../assets/profile.jpg';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const DetailsScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [reviews, setReviews] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [expandedPlot, setExpandedPlot] = useState(false);

  useEffect(() => {
    const bookDocRef = doc(db, 'books', book.id);
    const reviewsCollectionRef = collection(bookDocRef, 'reviews');

    const unsubscribe = onSnapshot(reviewsCollectionRef, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [book.id]);

  const handleToggleExpandReview = (id) => {
    setExpandedReviews(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleToggleExpandPlot = () => {
    setExpandedPlot(prevState => !prevState);
  };

  const handleNavigateToReview = () => {
    navigation.navigate('Review', { book });
  };

  const handleNavigateToCompetitionScreen = () => {
    navigation.navigate('Competition');
  };

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <View style={styles.back}>
            <TouchableOpacity onPress={handleNavigateToCompetitionScreen}>
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
                source={{ uri: book.imageURL }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2}>{book.title}</Text>
            <Text style={styles.body3}>{book.author} | {book.year}</Text>

            <View style={styles.genre}>
              {book.genres.map((genre, index) => (
                <Text key={index} style={styles.genreText}>{genre}</Text>
              ))}
            </View>
          </View>
          <View style={styles.horizontalLine}></View>

          <View style={styles.box1} marginTopTop={20}>
            <View style={styles.paddingbottom}>
              <Text style={styles.heading1} paddingBottom={20}>Plot</Text>
              <Text style={styles.body} paddingBottom={10}>
                {expandedPlot ? book.plot : `${book.plot.substring(0, 100)}...`}
                <Text
                  style={styles.readMoreText}
                  onPress={handleToggleExpandPlot}
                >
                  {expandedPlot ? ' Read Less' : ' Read More'}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.horizontalLine}></View>

          <View style={styles.rowContainer}>
            <Text style={styles.heading1}>Reviews</Text>
            <View style={styles.add}>
              <TouchableOpacity onPress={handleNavigateToReview}>
                <Ionicons name="add-circle-outline" size={32} color='white' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews Section */}
          {reviews.map(review => (
            <View key={review.id} style={styles.box1} marginTopTop={20}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.tinyLogo}
                  source={profile}
                />
                <Text style={styles.username}>{review.username}</Text>
              </View>
              <Text style={styles.reviewDescription}>
                {expandedReviews[review.id] ? review.text : `${review.text.substring(0, 100)}...`}
                <Text
                  style={styles.readMoreText}
                  onPress={() => handleToggleExpandReview(review.id)}
                >
                  {expandedReviews[review.id] ? ' Read Less' : ' Read More'}
                </Text>
              </Text>
              <View style={styles.voteContainer}>
                <TouchableOpacity onPress={toggleHeart}>
                  <Ionicons name={isFilled ? 'heart' : 'heart-outline'} size={32} color={isFilled ? '#CDF2FA' : 'white'} marginTop={10} marginRight={10} />
                </TouchableOpacity>
                <Text style={styles.body} paddingTop={10}>6</Text>
              </View>
            </View>
          ))}
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
    width: '100%', // Ensure the box takes up full width of its container
  },
  add: {
    marginLeft: 250, // Your styles for the share button container
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
  tinyLogo2: { // ToDO: make it so that it only appears if the user has the most votes
    width: 30,
    height: 30,
    borderRadius: 100, // Half of the width and height to make it circular
    marginLeft: 150,
  },
  reviewDescription: {
    color: 'white',
    fontSize: 16,
    width: '100%', // Make sure the review description takes up the full width
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: '#CDF2FA',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});

export default DetailsScreen;
