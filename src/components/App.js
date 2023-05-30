import '../index.css';
import React from 'react';
import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";
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
        //this.renderAllExpenses = this.renderAllExpenses.bind(this);
    }

    // adds a new expense and appends it to the list
    addExpense() {
        let newExpense = new ExpenseData(this.state.nameInput, this.state.amountInput);

        this.state.expenseDataList.push(newExpense)
        this.forceUpdate() // re-renders entire page with updated expenses
    }

    changeNameChange(name) {
        this.setState({nameInput: name});
    }

    changeAmountChange(amount) {
        this.setState({amountInput: amount});
    }

    // renders application
    render() {
        return  (
            <div>
                <header>Expense Tracker</header>
                <ExpensesForm onClick={() => this.addExpense()} onNameChange={this.changeNameChange} 
                onAmountChange={this.changeAmountChange} nameInput={this.state.nameInput} amountInput={this.state.amountInput}/>
                <AllExpenses expenses={this.state.expenseDataList}/>
                <TotalExpenses allExpenses={this.state.allExpensesAmount}/>
            </div>
        )
    };
}

export default App;