// Example structure of AddExpenseModal.js
import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

const AddExpenseModal = ({ isVisible, onClose }) => {
  const [amount, setAmount] = useState('');

  const saveExpense = async () => {
    try {
      const newExpense = { amount: parseFloat(amount) };
      const currentExpensesData = await AsyncStorage.getItem('expense');
      let updatedExpensesData = [];
  
      if (currentExpensesData) {
        const parsedData = JSON.parse(currentExpensesData);
        if (Array.isArray(parsedData)) {
          updatedExpensesData = parsedData;
        } else {
          console.error("Stored expenses data is not an array");
          // Handle the case where stored data is not an array
        }
      }
  
      updatedExpensesData.push(newExpense);
      await AsyncStorage.setItem('expense', JSON.stringify(updatedExpensesData));
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };
  
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Card>
          <Card.Title title="Add Expense" />
          <Card.Content>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions>
            <Button title="Save Expense" onPress={saveExpense} />
            <Button title="Close" onPress={onClose} />
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "100"
    },
    input: {
      borderRadius: "50%",
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
    },
  });
// Add styles for modalView and input

export default AddExpenseModal;
