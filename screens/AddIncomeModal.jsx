import React, { useState } from 'react';
import { Modal, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, TextInput, Button } from 'react-native-paper';

const AddIncomeModal = ({ isVisible, onClose, onIncomeAdded }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const saveIncome = async () => {
    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid amount.');
      return;
    }

    try {
      const newIncome = {
        amount: parseFloat(amount),
        description: description.trim(), // Ensure description is a string
      };
      const currentIncomeData = await AsyncStorage.getItem('income');
      const updatedIncomeData = currentIncomeData ? JSON.parse(currentIncomeData) : [];
      updatedIncomeData.push(newIncome);

      await AsyncStorage.setItem('income', JSON.stringify(updatedIncomeData));
      if (onIncomeAdded) {
        onIncomeAdded(newIncome); // Callback to inform parent component
      }
      onClose(); // Close the modal
      setAmount(''); // Reset the amount
      setDescription(''); // Reset the description
      Alert.alert('Success', 'Income Saved!');
    } catch (error) {
      Alert.alert('Error', 'There was an error saving the income.');
      console.error('Error saving income:', error);
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Add Income" />
          <Card.Content>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions>
            <Button onPress={saveIncome}>Save</Button>
            <Button onPress={onClose}>Close</Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {

    height: 40,
    width: '80%',

  },
  card: {
    width: '100%',
    marginVertical: 10,
  },
});

export default AddIncomeModal;
