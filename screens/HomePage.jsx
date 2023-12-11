import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import HomeImage from '../assets/Expense.jpg';
import AddIncomeModal from './AddIncomeModal';
import AddExpenseModal from './AddExpenseModal';
function HomePage({ navigation , isVisible, onClose }) {
    const [userEmail, setUserEmail] = useState('');
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const tableHead = ['Category', 'Amount'];
    const widthArr = [200, 100];
    const incomeTableData = incomeData.map(item => [item.description, `$${item.amount}`]);
    const expenseTableData = expenseData.map(item => [item.category, `$${item.amount}`]);
  

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
        fetchIncomeData();
        fetchExpenseData();
    }, []);
    const fetchIncomeData = async () => {
        const data = await AsyncStorage.getItem('income');
        const parsedData = data ? JSON.parse(data) : [];

        const formattedData = parsedData.map(item => ({
            description: item.description || 'Uncategorized',
            amount: item.amount ? parseFloat(item.amount).toFixed(2) : '0.00'
        }));
        setIncomeData(formattedData);
    };

    const fetchExpenseData = async () => {
        const data = await AsyncStorage.getItem('expense');
        const parsedData = data ? JSON.parse(data) : [];

        const formattedData = parsedData.map(item => ({
            category: item.category || 'Uncategorized',
            amount: item.amount ? parseFloat(item.amount).toFixed(2) : '0.00'
        }));
        setExpenseData(formattedData);
    };
    const renderTable = (title, data) => (
        <View style={styles.section}>
            <Text style={styles.subTitle}>{title}</Text>
            <Table borderStyle={styles.tableBorderStyle}>
                <Row data={tableHead} style={styles.head} textStyle={styles.tableText} widthArr={widthArr} />
                <Rows data={data} textStyle={styles.tableText} widthArr={widthArr} />
            </Table>
        </View>
    );
    const handleIncomeAdded = (newIncome) => {
        setIncomeData(prevIncomeData => {
          const updatedIncomeData = [...prevIncomeData, newIncome];
          // Save the updated income data to AsyncStorage
          AsyncStorage.setItem('income', JSON.stringify(updatedIncomeData)).catch(console.error);
          return updatedIncomeData;
        });
       
      };
    const handleExpenseAdded = (newExpense) => {
        setExpenseData(prevExpenseData => {
        const updatedExpenseData = [...prevExpenseData, newExpense];
        AsyncStorage.setItem('expense', JSON.stringify(updatedExpenseData)).catch(console.error);
        return updatedExpenseData;
    });
  
};
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <Image source={HomeImage} style={styles.image} />
            
            <Text style={styles.title}>Expense Tracker App</Text>
            {userEmail ? <Text style={styles.userInfo}>Welcome, {userEmail}</Text> : null}
            {renderTable('Income', incomeTableData)}
            {renderTable('Expenses', expenseTableData)}
            <Button mode="contained" onPress={() => navigation.navigate('ExpenseEntry')} color="#841584" style={styles.button}>
                Add Expense
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('AddIncome')} color="#008000" style={styles.button}>
                Add Income
            </Button>
            <AddIncomeModal
                 isVisible={isModalVisible}
                 onClose={handleCloseModal}
                onIncomeAdded={handleIncomeAdded}
            />
             <AddExpenseModal
                 isVisible={isModalVisible}
                 onClose={handleCloseModal}
                onIncomeAdded={handleExpenseAdded}
            />
            

        </ScrollView>

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
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    listItem: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,

    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'

    },
    text: {
        margin: 6
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 20,
    },
    section: {
        marginTop: 20,
    },
    tableBorderStyle: {
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
    },
    tableText: {
        textAlign: 'center',
        fontWeight: '200',
    },
});

export default HomePage;
