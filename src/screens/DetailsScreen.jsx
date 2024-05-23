import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import book1 from '../../assets/book1.png';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <View style={styles.back}>
            <TouchableOpacity>
              {/*do navigation back to competition screen*/}
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
      {/*fix styling space between image and text is to big*/}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.maincontainer}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={book1}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.body2} paddingBottom={5}>Title</Text>
            <Text style={styles.body3}>Auther</Text>
          </View>

        </View>
        {/*continue with details page*/}
      </ScrollView>
    </View>
  )
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
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20, // Adjust for the space below the content
  },
  maincontainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  share: {
    marginLeft: 300,// Your styles for the share button container
  },
  image: {
    width: 320,
  },
  imageContainer: {
    padding: 10,
  },
});

export default DetailsScreen;
