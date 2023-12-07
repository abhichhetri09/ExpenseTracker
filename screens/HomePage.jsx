import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

function HomePage({ navigation }) {
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Assuming the user is already signed in
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut(auth);
            Alert.alert("Signed Out", "You have successfully signed out!");
            navigation.navigate('SignIn');
        } catch (error) {
            console.error("Sign Out Error:", error);
            Alert.alert("Sign Out Error", "An error occurred while signing out. Please try again.");
        }
        setIsSigningOut(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expense Tracker App</Text>
            {userEmail ? <Text style={styles.userInfo}>Welcome, {userEmail}</Text> : null}
            <Button
                onPress={() => navigation.navigate('ExpenseEntry')}
                color="#841584"
            >
                Add Expense
            </Button>
            <Button
                onPress={() => navigation.navigate('AddIncome')}
                color="#008000" // Example of a different color
            >
                Add Income
            </Button>
            <Button 
                mode="contained" 
                onPress={handleSignOut} 
                style={styles.button}
                disabled={isSigningOut}
            >
                {isSigningOut ? <ActivityIndicator size="small" color="#FFF" /> : 'Sign Out'}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfo: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default HomePage;
