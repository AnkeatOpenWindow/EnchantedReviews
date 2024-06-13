import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LogInScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import CompetitionScreen from '../screens/CompetitionScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ReviewScreen from '../screens/Review';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#332850',
        tabBarInactiveTintColor: '#745BB6',
        tabBarStyle: [{ display: 'flex' }, null],
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-sharp';
          } else if (route.name === 'Profile') {
            iconName = 'person-sharp';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={SettingScreen} options={{ headerShown: false }} />
      {/* Add CompetitionScreen as a nested screen */}
      <Tab.Screen name="Competition" component={CompetitionScreen} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Details" component={DetailsScreen} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Review" component={ReviewScreen} options={{ headerShown: false, tabBarButton: () => null }} />
    </Tab.Navigator>

  );
};

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [fontLoaded] = useFonts({
    ModernAntiquaRegular: require('../../assets/fonts/Modern Antiqua Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          <>
            <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
            <Stack.Screen name="Competition" component={CompetitionScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LogInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
