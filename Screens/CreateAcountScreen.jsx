import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const exampleImage2 = require('../assets/scooter.jpg');
const exampleImage4 = require('../assets/think.jpg');
import { FontAwesome5 } from '@expo/vector-icons';



const styles = StyleSheet.create({
    maincontainer: {
        marginTop: 45,
        marginLeft: 20,
        marginRight: 20,
    },
});

const TestScreen2 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.maincontainer}>
                   <Text>CreateAccountScreen</Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default TestScreen2;