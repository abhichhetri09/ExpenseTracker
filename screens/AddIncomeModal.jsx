import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

const AddIncomeModal = ({ isVisible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const saveIncome = async () => {
    try {
      const newIncome = { amount: parseFloat(amount), description };
      const currentIncomeData = await AsyncStorage.getItem('income');
      const updatedIncomeData = currentIncomeData ? JSON.parse(currentIncomeData) : [];
      updatedIncomeData.push(newIncome);

      await AsyncStorage.setItem('income', JSON.stringify(updatedIncomeData));
      onClose(); // Reset state and close modal
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  return (
    <Modal
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
     animationType="slide" 
  >
    <View style={styles.modalView}>
      <Card>
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
          <Button title="Save Income" onPress={saveIncome} />
          <Button title="Close" onPress={onClose} />
        </Card.Actions>
      </Card>
    </View>
  </Modal>
);
};
// Updated styles for modalView
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "100",
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
    
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

export default AddIncomeModal;
