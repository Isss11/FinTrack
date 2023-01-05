import '../index.css';
import React from 'react';
import Expenses from "./Expenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";

// creates app page -- to include in another file later
class App extends React.Component {
    render() {
        return  (
            <div>
                <ExpensesForm/>
                <Expenses/>
                <TotalExpenses/>
            </div>
        )
    };
}

export default App;