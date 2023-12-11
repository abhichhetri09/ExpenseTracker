import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './screens/HomePage';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Settings from './screens/settings';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddIncome from './screens/AddIncome';
import ExpenseEntry from './screens/ExpenseEntry';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return unsubscribe;
  }, []);
 
 
  if (isSignedIn) {
    // User is signed in - show tab navigator
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="HomePage" component={HomePage} options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
              headerShown: false
            }}/>
                <Tab.Screen name="Dashboard" component={Dashboard} options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="dashboard" size={size} color={color} />
              ),
              headerShown: false
            }}/>
                <Tab.Screen name="Settings" component={Settings} options={{
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" size={size} color={color}  />
              ),
              headerShown: false
            }}/>
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="ExpenseEntry" component={ExpenseEntry} />
          <Stack.Screen name="AddIncome" component={AddIncome} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // User is not signed in - show stack navigator
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
};

export default AppNavigator;