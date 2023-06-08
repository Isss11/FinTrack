import '../index.css';
import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";
import ExpenseData from './ExpenseData.js';
import { useState } from 'react';

// creates app page -- to include in another file later
function App(props) {
    const [allExpensesAmount, setAllExpensesAmount] = useState(0);
    const [expenseDataList, setExpenseDataList] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [amountInput, setAmountInput] = useState(0);

    function calculateTotalExpenses() {
        setAllExpensesAmount(0);

        expenseDataList.forEach(addExpenseToTotal)
    }

    function addExpenseToTotal(expense) {
        setAllExpensesAmount(allExpensesAmount + Number(expense.amount));
    }

    // adds a new expense and appends it to the list
    function addExpense() {
        // resetting list with appended value
        setExpenseDataList([...expenseDataList, new ExpenseData(nameInput, amountInput)])

        // https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
        calculateTotalExpenses();
    }

    // deletes an expense, given an index
    function deleteExpense(e) {
        console.log("Hello");
        console.log(e.target)
        // console.log(e.target.getAttribute('id'));
    }

    function changeNameChange(name) {
        setNameInput(name);
    }

    function changeAmountChange(amount) {
        setAmountInput(amount);
    }

    // renders application
    return  (

            <div>
                <header>Expense Tracker</header>
                <ExpensesForm onClick={() => addExpense()} onNameChange={changeNameChange} 
                onAmountChange={changeAmountChange} nameInput={nameInput} amountInput={amountInput}/>
                <AllExpenses expenses={expenseDataList} onDelete={(e) => deleteExpense(e)}/>
                <TotalExpenses allExpenses={allExpensesAmount}/>
            </div>
        )
}

export default App;