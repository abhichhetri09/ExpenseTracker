import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './screens/HomePage';
import ExpenseEntry from './screens/ExpenseEntry';
import AddIncome from './screens/AddIncome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './screens/Dashboard';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="HomePage" component={HomePage} />
          <Tab.Screen name="Dashboard" component={Dashboard} />

          <Tab.Screen name="ExpenseEntry" component={ExpenseEntry} />
          <Tab.Screen name="AddIncome" component={AddIncome} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="SignIn">
          <Tab.Screen name="SignIn" component={SignIn} />
          <Tab.Screen name="SignUp" component={SignUp} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
