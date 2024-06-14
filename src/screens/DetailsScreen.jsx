import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile from '../../assets/profile.jpg';
import crest from '../../assets/Crest.png';
import { doc, collection, onSnapshot, updateDoc, getDoc, increment } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const DetailsScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [reviews, setReviews] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [expandedPlot, setExpandedPlot] = useState(false);
  const [votedReviews, setVotedReviews] = useState(new Set());
  const [filter, setFilter] = useState('mostVoted');
  const [maxVotesReviewId, setMaxVotesReviewId] = useState(null);

  useEffect(() => {
    const bookDocRef = doc(db, 'books', book.id);
    const reviewsCollectionRef = collection(bookDocRef, 'reviews');

    const unsubscribe = onSnapshot(reviewsCollectionRef, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        votes: doc.data().votes || 0,
      }));

      // Determine the review with the maximum votes
      if (reviewsData.length > 0) {
        const maxVotesReviewData = reviewsData.reduce((maxReview, currentReview) =>
          currentReview.votes > maxReview.votes ? currentReview : maxReview, reviewsData[0]
        );
        setMaxVotesReviewId(maxVotesReviewData.id);
      } else {
        setMaxVotesReviewId(null);
      }

      // Sort reviews based on the selected filter
      if (filter === 'mostVoted') {
        reviewsData.sort((a, b) => b.votes - a.votes);
      } else if (filter === 'latest') {
        reviewsData.sort((a, b) => b.createdAt - a.createdAt);
      }

      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [book.id, filter]);

  useEffect(() => {
    setExpandedReviews({});
    setVotedReviews(new Set());
    setMaxVotesReviewId(null);
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
    setIsFilled(prevState => !prevState);
  };

  const handleVote = async (reviewId, userId) => {
    if (!votedReviews.has(reviewId)) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData && userData.votedReviews && userData.votedReviews.includes(reviewId)) {
          throw new Error('You have already voted for this review.');
        }

        if (auth.currentUser.uid === userId) {
          throw new Error('You cannot vote for your own review.');
        }

        const reviewDocRef = doc(db, 'books', book.id, 'reviews', reviewId);
        await updateDoc(reviewDocRef, { votes: increment(1) });

        const updatedVotedReviews = userData.votedReviews ? [...userData.votedReviews, reviewId] : [reviewId];
        await updateDoc(userDocRef, { votedReviews: updatedVotedReviews });

        setReviews(prevState =>
          prevState.map(review => review.id === reviewId ? { ...review, votes: review.votes + 1 } : review)
        );
        setVotedReviews(prevState => new Set(prevState.add(reviewId)));
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('You have already voted for this review.');
    }
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
          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={() => setFilter('mostVoted')} style={filter === 'mostVoted' ? styles.activeFilter : styles.filter}>
              <Text style={styles.filterText}>Most Voted</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilter('latest')} style={filter === 'latest' ? styles.activeFilter : styles.filter}>
              <Text style={styles.filterText}>Latest</Text>
            </TouchableOpacity>
          </View>
          {/* Reviews Section */}
          {reviews.map(review => (
            <View key={review.id} style={styles.box1} marginTopTop={20}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.tinyLogo}
                  source={review.userImage ? { uri: review.userImage } : profile}
                />
                <Text style={styles.username}>{review.username}</Text>
                {maxVotesReviewId === review.id && (
                  <Image
                    style={styles.tinyLogo2}
                    source={crest}
                  />
                )}
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
                <TouchableOpacity onPress={() => handleVote(review.id, review.userId)}>
                  <Ionicons name="heart-outline" size={32} color={isFilled ? '#CDF2FA' : 'white'} marginTop={10} marginRight={10} />
                </TouchableOpacity>
                <Text style={styles.body} paddingTop={10}>{review.votes}</Text>
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
    zIndex: 100,
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
    paddingBottom: 20,
  },
  maincontainer: {
    alignItems: 'center',
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
    fontSize: 24,
    color: 'white',
    marginTop: 10,
  },
  body3: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginTop: 5,
  },
  share: {
    marginLeft: 300,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '90%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width: 320,
    height: 220,
    borderRadius: 20,
  },
  genre: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    fontSize: 12,
    color: 'white',
    padding: 14,
    backgroundColor: "#745BB6",
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10,
  },
  horizontalLine: {
    width: '100%',
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
    width: '100%',
  },
  add: {
    marginLeft: 250,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  username: {
    marginLeft: 10,
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  tinyLogo2: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginLeft: 30,
  },
  reviewDescription: {
    color: 'white',
    fontSize: 16,
    width: '100%',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  filter: {
    padding: 10,
    backgroundColor: '#AD91F6',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeFilter: {
    padding: 10,
    backgroundColor: '#745BB6',
    borderRadius: 5,
    marginHorizontal: 5,

  },
  filterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
