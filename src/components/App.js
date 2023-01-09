import '../index.css';
import React from 'react';
import Expenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";
import Expense from './Expense';
import ExpenseData from './ExpenseData.js';

// creates app page -- to include in another file later
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allExpensesAmount: 0, // always starts at zero
            expenseDataList: [], // holds array containing objects of expense data
            nameInput: '',
            amountInput: 0
        }

        this.addExpense = this.addExpense.bind(this);
        this.changeAmountChange = this.changeAmountChange.bind(this);
        this.changeNameChange = this.changeNameChange.bind(this);
        this.renderExpense = this.renderExpense.bind(this);
        //this.renderAllExpenses = this.renderAllExpenses.bind(this);
    }

    // adds a new expense and appends it to the list
    addExpense() {
        let newExpense = new ExpenseData(this.state.nameInput, this.state.amountInput);

        // FIXME, need to have some sort of key value to append to it or something when adding it to the list
    }

    changeNameChange(name) {
        this.setState({nameInput: name});
    }

    changeAmountChange(amount) {
        this.setState({amountInput: amount});
    }

    // renders one individual expense
    renderExpense(givenData) {
        return (
            <Expense expenseName={givenData.expenseName} expenseAmount={givenData.expenseAmount}/>
        )
    }

    // renders all expenses, iterating through array
    /*
    renderAllExpenses() {
        for (let expenseData in expenseDataList) {
            this.renderExpense(expenseData);
        }
    }*/

    // renders application
    render() {
        const expenseForm = <ExpensesForm onClick={() => this.addExpense()} onNameChange={this.changeNameChange} 
        onAmountChange={this.changeAmountChange} nameInput={this.state.nameInput} amountInput={this.state.amountInput}/>;

        return  (
            <div>
                <header>Expense Tracker</header>
                {expenseForm} 
                <Expenses/>
                <TotalExpenses allExpenses={this.state.allExpensesAmount}/>

                <footer>Made by Isaiah Sinclair, 2023</footer>
            </div>
        )
    };
}

export default App;