import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoricalData, setCategoricalData] = useState([]);

  const fetchData = async () => {
    try {
      const incomeData = await AsyncStorage.getItem('income');
      const expensesData = await AsyncStorage.getItem('expense');
  
      const parsedIncomeData = incomeData ? JSON.parse(incomeData) : [];
      const parsedExpensesData = expensesData ? JSON.parse(expensesData) : [];
  
      if (Array.isArray(parsedIncomeData) && Array.isArray(parsedExpensesData)) {
        setTotalIncome(calculateTotal(parsedIncomeData));
        setTotalExpenses(calculateTotal(parsedExpensesData));
  
        // Prepare data for Pie Chart
        const chartData = prepareChartData(parsedIncomeData, parsedExpensesData);
        setCategoricalData(chartData);
      } else {
        console.error("Fetched data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const prepareChartData = (incomeData, expensesData) => {
    let chartData = [];
    incomeData.forEach((item, index) => {
      chartData.push({
        name: `Income ${index + 1}`,
        amount: item.amount,
        color: '#00ff00', // Green color for income
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      });
    });
    expensesData.forEach((item, index) => {
      chartData.push({
        name: `Expense ${index + 1}`,
        amount: item.amount,
        color: '#ff0000', // Red color for expenses
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      });
    });
  
    return chartData;
  };


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // Add other necessary properties
  };

  useEffect(() => {
    fetchData();
  }, []);
  const calculateTotal = (data) => {
    // Ensure data is an array before using reduce
    if (Array.isArray(data)) {
      return data.reduce((acc, current) => acc + current.amount, 0);
    }
    return 0;
  };
  return (
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
      <View style={styles.chartContainer}>
        <PieChart
          data={categoricalData}
          height={220}
          chartConfig={chartConfig}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          // other necessary props
        />
      </View>
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
    margin: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
export default Dashboard;
