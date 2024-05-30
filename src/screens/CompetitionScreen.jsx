import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import Logo from '../../assets/Logo.png';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';


const CompetitionScreen = ({ navigation }) => {

  const handleNavigateToDetail = () => {
    navigation.navigate('Details');
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
          <TouchableOpacity style={styles.card} onPress={handleNavigateToDetail}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image2}
                source={book1}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2} paddingBottom={5}>Title</Text>
            <Text style={styles.body3}>Auther</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image2}
                source={book2}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2} paddingBottom={5}>Title</Text>
            <Text style={styles.body3}>Auther</Text>
          </TouchableOpacity>
        </View>


      </View>
    </ScrollView>
  )
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
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    // add box shaddow later
  },
  booksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusts space between the items
    marginBottom: 10, // Adjust the space below the container
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
  }

});
export default CompetitionScreen