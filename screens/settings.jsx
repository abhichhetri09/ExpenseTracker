// screens/Settings.jsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { Button } from 'react-native-paper';

import { signOut } from 'firebase/auth';

function Settings({ navigation }) {
    const userEmail = auth.currentUser?.email; // Optional chaining if user is not signed in
    const [isSigningOut, setIsSigningOut] = useState(false);
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
            <Text style={styles.title}>User Information</Text>
            <Text>{userEmail}</Text>
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

export default Settings;
