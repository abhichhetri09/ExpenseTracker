import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions,Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import HomeImage from '../assets/Expense.jpg';

const screenWidth = Dimensions.get('window').width;

function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchData = async () => {
    try {
      const incomeData = await AsyncStorage.getItem('income');
      const expensesData = await AsyncStorage.getItem('expense');

      const parsedIncomeData = incomeData ? JSON.parse(incomeData) : [];
      const parsedExpensesData = expensesData ? JSON.parse(expensesData) : [];

      setTotalIncome(calculateTotal(parsedIncomeData));
      setTotalExpenses(calculateTotal(parsedExpensesData));
      categorizeExpenses(parsedExpensesData);
      const combinedData = [
        ...parsedIncomeData.map(item => ({ ...item, type: 'Income' })),
        ...parsedExpensesData.map(item => ({ ...item, type: 'Expense' }))
      ];
      categorizeExpenses(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categorizeExpenses = (expenses) => {
    const categories = expenses.reduce((acc, curr) => {
      const category =  `${curr.type} - ${curr.category || 'Uncategorized'}`;
      const sum = acc[category] ? acc[category] + curr.amount : curr.amount;
      return { ...acc, [category]: sum };
    }, {});

    const pieChartData = Object.keys(categories).map((key, index) => ({
      name: key,
      amount: categories[key],
      color: chartColors[index % chartColors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
      onPress: () => setActiveIndex(index),
    }));

    setExpenseCategories(pieChartData);
  };

  const calculateTotal = (data) => {
    return Array.isArray(data) ? data.reduce((acc, curr) => acc + curr.amount, 0) : 0;
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    // ... other properties
  };
  const renderTooltip = () => {
    if (activeIndex !== null && expenseCategories[activeIndex]) {
      return (
        <View style={styles.tooltip}>
          <Text>{expenseCategories[activeIndex].name}: {expenseCategories[activeIndex].amount}</Text>
        </View>
      );
    }
    return null;
  };
  const getSuggestions = () => {
    const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 0;
    
    if (expenseRatio > 0.7) {
      return "Your expenses are quite high compared to your income. Consider reviewing your expenses to improve your savings.";
    } else if (expenseRatio > 0.5) {
      return "You're spending a significant portion of your income. Maybe look for ways to save more.";
    } else {
      return "Your spending is within a healthy range compared to your income. Keep it up!";
    }
  };
  return (
    <>
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Dashboard</Title>
          <Paragraph>Total Income: {totalIncome}</Paragraph>
          <Paragraph>Total Expenses: {totalExpenses}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={fetchData}>Refresh</Button>
        </Card.Actions>
      </Card>
      {expenseCategories.length > 0 ? (
        <PieChart
          data={expenseCategories.map((entry, index) => ({
            ...entry,
            onPress: () => setActiveIndex(index), 
          }))}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          
          absolute

        />

      ) : null}
       {renderTooltip()}
       <View style={styles.suggestionBox}>
  <Title style={styles.suggestionTitle}>Suggestions for you</Title>
  <Paragraph>{getSuggestions()}</Paragraph>
</View>

    </View>

    </>
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
    margin: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    top: 10, 
    left: 10,
  },
  suggestionBox: {
    padding: 20,
    marginVertical: 20,
  },
  suggestionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default Dashboard;
