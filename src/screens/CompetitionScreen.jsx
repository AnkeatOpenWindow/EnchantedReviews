import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Logo from '../../assets/Logo.png';

const CompetitionScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [expandedPlot, setExpandedPlot] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigateToDetail = (book) => {
    navigation.navigate('Details', { book });
  };

  const handleToggleExpandPlot = () => {
    setExpandedPlot(prevState => !prevState);
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
        </View>

        <View style={styles.box1}>
          <View style={styles.paddingbottom}>
            <Text style={styles.heading1} paddingBottom={5}>Welcome to</Text>
            <Text style={styles.heading2} paddingBottom={20}>Our book review competition!!</Text>
            <Text style={styles.body} paddingBottom={10}>
              Here you can pick your favorite book and write your very own review about them.
            </Text>
            <Text style={styles.body} paddingBottom={5}>
              Then have other people vote on who has the best review on a spesfic book.
            </Text>
            <Text style={styles.body} paddingBottom={5}>
              You can vote for as many as you want, but not for yourself, no-no, that's cheating.
            </Text>
            <Text style={styles.body} paddingBottom={5}>
              The user with the highest voted review will resieve a spesial badge next to their names.
            </Text>
            <Text style={styles.body} paddingBottom={5}>
              What to know what the badge looks like? Then you'll just have to win and see for yourself.
            </Text>
          </View>
        </View>

        <Text style={styles.headings2}>Books for reviewing</Text>
        <View style={styles.booksContainer}>
          {books.map((book) => (
            <TouchableOpacity key={book.id} style={styles.card} onPress={() => handleNavigateToDetail(book)}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image2}
                  source={{ uri: book.imageURL }}
                  resizeMode="contain"
                />
              </View>
              {/*TODO: Add a short description for each book*/}
              <Text style={styles.body2} paddingBottom={5}>{book.title}</Text>
              <Text style={styles.body3}>{book.author}</Text>
              <Text style={styles.body3} paddingBottom={10}>
                description
              </Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 20,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  booksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10, 
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#745BB6',
    borderRadius: 10,
    paddingBottom: 10,
  },
  imageContainer: {
    padding: 10,
  },
  image2: {
    width: 150,
    height: 200,
  },

});

export default CompetitionScreen;
