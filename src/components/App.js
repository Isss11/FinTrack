import '../index.css';
import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import EditExpenseForm from './EditExpenseForm';
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
    const [categoriesAmountsMap, setCategoriesAmountsMap] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editedExpense, setEditedExpense] = useState(-1);

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
        const newCategoriesAmountsMap = new Map()

        // iterate through each element, mapping indices to categories
        for (let i = 0; i < expenseDataList.length; ++i) {
            let currentExpenseCategory = expenseDataList[i].category;
            let currentExpenseAmount = expenseDataList[i].amount;

            if (newCategoriesMap.has(currentExpenseCategory)) {
                let mappedList = newCategoriesMap.get(currentExpenseCategory);
                mappedList.push(i);

                let newAmount = newCategoriesAmountsMap.get(currentExpenseCategory) + currentExpenseAmount;

                newCategoriesMap.set(currentExpenseCategory, mappedList);
                newCategoriesAmountsMap.set(currentExpenseCategory, newAmount);
            } else {
                newCategoriesMap.set(currentExpenseCategory, [i]);
                newCategoriesAmountsMap.set(currentExpenseCategory, currentExpenseAmount);
            }
        }

        setCategoriesMap(newCategoriesMap);
        setCategoriesAmountsMap(newCategoriesAmountsMap);
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

    function editExpense() {
        console.log("Finished editing expense.");

        // taking currently edited expense and changing it to the input box values
        let newExpenseDataList = []
        expenseDataList.forEach(expense => {newExpenseDataList.push(new ExpenseData(expense.name, expense.amount, expense.date,
            expense.category))});
        
        newExpenseDataList[editedExpense] = new ExpenseData(nameInput, amountInput, dateInput, categoryInput);

        setExpenseDataList(newExpenseDataList);

        setEditing(false);
        setEditedExpense(-1);
    }

    function startEditingExpense(e) {
        let editID = e.target.id;
        let expenseInfo = expenseDataList[editID];

        console.log("Start editing expense.");
        
        setEditing(true);
        setEditedExpense(editID);

        // loading up edit input boxes with existing values of object that we're editing
        setNameInput(expenseInfo.name);
        setAmountInput(expenseInfo.amount);
        setDateInput(expenseInfo.date);
        setCategoryInput(expenseInfo.category);
    }

    // FIXME might need an event parameter or a key in order to work
    function cancelEditingExpense() {
        console.log("Canceled expense edit.");
        setEditing(false);
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

                <ExpensesForm isVisible={editing ? false : true} onClick={() => addExpense()} onNameChange={changeNameChange} 
                onAmountChange={changeAmountChange} onDateChange={changeDate} onCategoryChange={changeCategoryInput} 
                nameInput={nameInput} amountInput={amountInput} dateInput={dateInput} categoryInput={categoryInput}
                    currentCategories={Array.from(categoriesMap.keys())}/>

                <EditExpenseForm isVisible={editing ? true : false} onFinishedEditing={() => editExpense()} 
                onCancel={() => cancelEditingExpense()} onNameChange={changeNameChange} onAmountChange={changeAmountChange} 
                onDateChange={changeDate} onCategoryChange={changeCategoryInput} nameInput={nameInput} amountInput={amountInput} 
                dateInput={dateInput} categoryInput={categoryInput} currentCategories={Array.from(categoriesMap.keys())}/>

                <AllExpenses expenses={expenseDataList} onDelete={(e) => deleteExpense(e)} 
                categoriesAmountsEntries={Array.from(categoriesAmountsMap.entries())} onEdit={(e) => startEditingExpense(e)}/>

                <TotalExpenses allExpenses={allExpensesAmount}/>
            </div>
        )
}

export default App;