import '../index.css';
import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import TotalExpenses from "./TotalExpenses.js";
import ExpenseData from './ExpenseData.js';
import { useEffect, useState } from 'react';

// creates app page -- to include in another file later
function App(props) {
    const [allExpensesAmount, setAllExpensesAmount] = useState(0);
    const [expenseDataList, setExpenseDataList] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [amountInput, setAmountInput] = useState(0);
    const [dateInput, setDateInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [categoriesMap, setCategoriesMap] = useState([]);

    useEffect(changeDate, [dateInput]);
    useEffect(calculateTotalExpenses, [expenseDataList]);
    useEffect(checkThroughCategories, [expenseDataList]);

    // every time expenseDataList is changed, total expenses are re-calculated
    function calculateTotalExpenses() {
        // https://stackoverflow.com/questions/54119678/is-usestate-synchronous
        let calculatedAmount = 0;

        expenseDataList.forEach(expense => {calculatedAmount += Number(expense.amount)});
        setAllExpensesAmount(calculatedAmount);

        console.log(expenseDataList);
    }

    // creates a hashmap for all the categories, and creates a list to be used to created the datalist
    function checkThroughCategories() {
        const newCategoriesMap = new Map();

        // iterate through each element, mapping indices to categories
        for (let i = 0; i < expenseDataList.length; ++i) {
            let currentExpenseCategory = expenseDataList[i].category;

            if (newCategoriesMap.has(currentExpenseCategory)) {
                let mappedList = newCategoriesMap.get(currentExpenseCategory);
                mappedList.push(i);

                newCategoriesMap.set(currentExpenseCategory, mappedList);
            } else {
                newCategoriesMap.set(currentExpenseCategory, [i]);
            }
        }

        setCategoriesMap(newCategoriesMap);
        console.log(Array.from(newCategoriesMap.keys()));
    }

    // adds a new expense and appends it to the list
    function addExpense() {
        // resetting list with appended value
        setExpenseDataList([...expenseDataList, new ExpenseData(nameInput, amountInput, dateInput, categoryInput)]);
    }

    // deletes an expense, given an index
    function deleteExpense(e) {
        let removeID = e.target.id;

        // copying individual elements to create a different memory reference (or else React will think element is the same)
        let newExpenseDataList = []
        expenseDataList.forEach(expense => {newExpenseDataList.push(new ExpenseData(expense.name, expense.amount, expense.date,
            expense.category))});
        newExpenseDataList.splice(removeID, 1);

        setExpenseDataList(newExpenseDataList);
    }

    function changeNameChange(name) {
        setNameInput(name);
    }

    function changeAmountChange(amount) {
        setAmountInput(Number(amount));
    }

    function changeDate(newDate) {
        if (newDate != null) {
            setDateInput(String(newDate));
        }
    }

    function changeCategoryInput(category) {
        setCategoryInput(category);
    }

    // renders application
    return  (
            <div>
                <header>Expense Tracker</header>
                <ExpensesForm onClick={() => addExpense()} onNameChange={changeNameChange} 
                onAmountChange={changeAmountChange} onDateChange={changeDate} onCategoryChange={changeCategoryInput} 
                nameInput={nameInput} amountInput={amountInput} dateInput={dateInput} categoryInput={categoryInput}
                    currentCategories={Array.from(categoriesMap.keys())}
                />
                <AllExpenses expenses={expenseDataList} onDelete={(e) => deleteExpense(e)}/>
                <TotalExpenses allExpenses={allExpensesAmount}/>
            </div>
        )
}

export default App;