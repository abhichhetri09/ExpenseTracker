import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AddIncomeModal from './AddIncomeModal';

function AddIncome() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Add Income" />
        <Card.Content>
          {/* Additional content if needed */}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => setModalVisible(true)}>Add Income</Button>
        </Card.Actions>
      </Card>
      <AddIncomeModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  card: {
    width: '100%',
    marginVertical: 10,
  },
});

export default AddIncome;
