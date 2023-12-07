import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Signed In", "You have successfully signed in!");
      navigation.navigate('Home'); // Adjust this to your home screen route
    } catch (error) {
      console.log("Sign In Error:", error);
      Alert.alert("Sign In Error", "An error occurred during sign in. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
      />
      <Button title="Sign In" onPress={handleSignIn} color="#841584" />
      <Text 
        style={styles.signUpText} 
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign Up
      </Text>
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
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  signUpText: {
    marginTop: 15,
    color: 'blue',
  },
});

export default SignIn;
