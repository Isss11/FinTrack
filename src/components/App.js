import '../index.css';
import React from 'react';
import Expenses from "./Expenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";

// creates app page -- to include in another file later
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesAmount: 0, // always starts at zero
            expenses: [] // list of all expenses, with object of name and value
        }
    }

    // renders application
    render() {
        return  (
            <div>
                <header>Expense Tracker</header>
                <ExpensesForm/>
                <Expenses/>
                <TotalExpenses allExpenses={this.state.expensesAmount}/>

                <footer>Made by Isaiah Sinclair, 2023</footer>
            </div>
        )
    };
}

export default App;