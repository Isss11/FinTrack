import '../index.css';
import React from 'react';
import Expenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";
import Expense from './Expense';

// creates app page -- to include in another file later
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesAmount: 0, // always starts at zero
            expenseDataList: [] // holds array containing objects of expense data
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderExpense = this.renderExpense.bind(this);
        this.renderAllExpenses = this.renderAllExpenses.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); // prevents form from reloadin
        alert("Name: " + this.state.expenseName + " Amount: " + this.state.expenseAmount);
    }

    // renders one individual expense
    renderExpense(givenData) {
        return (
            <Expense expenseName={givenData.expenseName} expenseAmount={givenData.expenseAmount}/>
        )
    }

    // renders all expenses, iterating through array
    renderAllExpenses() {
        for (let expenseData in expenseDataList) {
            this.renderExpense(expenseData);
        }
    }

    // renders application
    render() {
        return  (
            <div>
                <header>Expense Tracker</header>
                <ExpensesForm onSubmit={this.handleSubmit}/>
                <Expenses/>
                <TotalExpenses allExpenses={this.state.expensesAmount}/>

                <footer>Made by Isaiah Sinclair, 2023</footer>
            </div>
        )
    };
}

export default App;