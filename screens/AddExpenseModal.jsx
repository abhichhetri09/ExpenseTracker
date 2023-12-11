import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, TextInput, Button } from 'react-native-paper';

const AddExpenseModal = ({ isVisible, onClose, onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const saveExpense = async () => {
    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return;
    }

    if (!category.trim()) {
      Alert.alert("Validation Error", "Please enter a category.");
      return;
    }

    try {
      const newExpense = {
        amount: parseFloat(amount),
        category: category.trim(),
      };
      const currentExpensesData = await AsyncStorage.getItem('expense');
      const updatedExpensesData = currentExpensesData ? JSON.parse(currentExpensesData) : [];
      updatedExpensesData.push(newExpense);

      await AsyncStorage.setItem('expense', JSON.stringify(updatedExpensesData));
      if (onExpenseAdded) {
        onExpenseAdded(newExpense); // Callback to inform parent component
      }
      onClose(); // Close the modal
      setAmount(''); // Reset the amount
      setCategory(''); // Reset the category
      Alert.alert("Success", "Expense Saved!");
    } catch (error) {
      Alert.alert("Error", "There was an error saving the expense.");
      console.error("Error saving expense:", error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Add Expense" />
          <Card.Content>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Enter category"
              value={category}
              onChangeText={setCategory}
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions>
            <Button onPress={saveExpense}>Add</Button>
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
    marginBottom: 10,
  },
  card: {
    width: '90%',
    marginVertical: 10,
  },
});

export default AddExpenseModal;
