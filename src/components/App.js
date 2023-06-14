import '../index.css';
import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import EditExpenseForm from './EditExpenseForm';
import TotalExpenses from "./TotalExpenses.js";
import ExpenseData from './ExpenseData.js';
import { useEffect, useState } from 'react';

// creates app page -- to include in another file later
function App(props) {
    const [tracker, setTracker] = useState({
        allExpensesAmount: 0,
        expenseDataList: [],
        nameInput: '',
        amountInput: 0,
        dateInput: getCurrentDate(),
        categoryInput: '',
        nameEditInput: '',
        amountEditInput: 0,
        dateEditInput: getCurrentDate(),
        categoryEditInput: '',
        categoriesMap: [],
        categoriesAmountsMap: [],
        editing: false,
        editedExpense: -1
    });

    useEffect(changeDate, [tracker.dateInput]);
    useEffect(changeEditDate, [tracker.dateEditInput]);
    useEffect(calculateTotalExpenses, [tracker.expenseDataList]);
    useEffect(checkThroughCategories, [tracker.expenseDataList]);

    // every time expenseDataList is changed, total expenses are re-calculated
    function calculateTotalExpenses() {
        // https://stackoverflow.com/questions/54119678/is-usestate-synchronous
        let calculatedAmount = 0;

        tracker.expenseDataList.forEach(expense => {calculatedAmount += Number(expense.amount)});
        setTracker(previousState => {return {...previousState, allExpensesAmount: calculatedAmount}});
    }

    // creates a hashmap for all the categories, and creates a list to be used to created the datalist
    function checkThroughCategories() {
        const newCategoriesMap = new Map();
        const newCategoriesAmountsMap = new Map()

        // iterate through each element, mapping indices to categories
        for (let i = 0; i < tracker.expenseDataList.length; ++i) {
            let currentExpenseCategory = tracker.expenseDataList[i].category;
            let currentExpenseAmount = tracker.expenseDataList[i].amount;

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

        setTracker(previousState => {return {...previousState, categoriesMap: newCategoriesMap}});
        setTracker(previousState => {return {...previousState, categoriesAccountsMap: newCategoriesAmountsMap}});
    }

    // resets non-editing input fields back to their default values
    function resetInputFields() {
        setTracker(previousState => {return {...previousState, nameInput: ''}});
        setTracker(previousState => {return {...previousState, amountInput: 0}});
        setTracker(previousState => {return {...previousState, nameInput: getCurrentDate()}});
        setTracker(previousState => {return {...previousState, nameInput: ''}});
    }

    // gets the current date and returns in the proper format for the HTML object
    // https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
    // https://stackoverflow.com/questions/39790102/insert-character-in-string-using-javascript
    function getCurrentDate() {
        let dateObject = new Date()
        let res = String(dateObject.toISOString().slice(0,10).replace(/-/g,""));

        res = String(res.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));

        return res;
    }

    // adds a new expense and appends it to the list
    function addExpense() {
        // resetting list with appended value

        setTracker(previousState => {return {...previousState, expenseDataList: [...tracker.expenseDataList, 
            new ExpenseData(tracker.nameInput, tracker.amountInput, tracker.dateInput, tracker.categoryInput)]}});
        resetInputFields();
    }

    // deletes an expense, given an index
    function deleteExpense(e) {
        let removeID = e.target.id;

        // copying individual elements to create a different memory reference (or else React will think element is the same)
        let newExpenseDataList = []
        tracker.expenseDataList.forEach(expense => {newExpenseDataList.push(new ExpenseData(expense.name, expense.amount, expense.date,
            expense.category))});
        newExpenseDataList.splice(removeID, 1);

        setTracker(previousState => {return {...previousState, expenseDataList: newExpenseDataList}});
    }

    function editExpense() {
        // taking currently edited expense and changing it to the input box values
        let newExpenseDataList = []
        tracker.expenseDataList.forEach(expense => {newExpenseDataList.push(new ExpenseData(expense.name, expense.amount, expense.date,
            expense.category))});
        
        newExpenseDataList[tracker.editedExpense] = new ExpenseData(tracker.nameEditInput, tracker.amountEditInput, tracker.dateEditInput, tracker.categoryEditInput);

        setTracker(previousState => {return {...previousState, expenseDataList: newExpenseDataList}});

        setTracker(previousState => {return {...previousState, editing: false}});
        setTracker(previousState => {return {...previousState, editedExpense: -1}});
    }

    function startEditingExpense(e) {
        let editID = e.target.id;
        let expenseInfo = tracker.expenseDataList[editID];
        
        setTracker(previousState => {return {...previousState, editing: true}});
        setTracker(previousState => {return {...previousState, editedExpense: editID}});

        // loading up edit input boxes with existing values of object that we're editing
        setTracker(previousState => {return {...previousState, nameEditInput: expenseInfo.name}});
        setTracker(previousState => {return {...previousState, amountEditInput: expenseInfo.amount}});
        setTracker(previousState => {return {...previousState, dateEditInput: expenseInfo.date}});
        setTracker(previousState => {return {...previousState, categoryEditInput: expenseInfo.category}});
    }

    // FIXME might need an event parameter or a key in order to work
    function cancelEditingExpense() {
        setTracker(previousState => {return {...previousState, editing: false}});
    }

    function changeNameChange(name) {
        setTracker(previousState => {return {...previousState, nameInput: name}});
        setTracker(previousState => {return {...previousState, editedExpense: -1}});
    }

    function changeAmountChange(amount) {
        setTracker(previousState => {return {...previousState, amountInput: Number(amount)}});
    }

    function changeDate(newDate) {
        if (newDate != null) {
            setTracker(previousState => {return {...previousState, dateInput: String(newDate)}});
        }
    }

    function changeCategoryInput(category) {
        setTracker(previousState => {return {...previousState, categoryInput: category}});
    }

    function changeNameEditChange(name) {
        setTracker(previousState => {return {...previousState, nameEditInput: String(name)}});
    }

    function changeAmountEditChange(amount) {
        setTracker(previousState => {return {...previousState, amountEditInput: Number(amount)}});
    }

    function changeEditDate(newDate) {
        if (newDate != null) {
            setTracker(previousState => {return {...previousState, dateEditInput: String(newDate)}});
        }
    }

    function changeCategoryEditInput(category) {
        setTracker(previousState => {return {...previousState, categoryEditInput: category}});
    }

    // renders application
    return  (
            <div>
                <header>Expense Tracker</header>

                <ExpensesForm isVisible={tracker.editing ? false : true} onClick={() => addExpense()} onNameChange={changeNameChange} 
                onAmountChange={changeAmountChange} onDateChange={changeDate} onCategoryChange={changeCategoryInput} 
                nameInput={tracker.nameInput} amountInput={tracker.amountInput} dateInput={tracker.dateInput} categoryInput={tracker.categoryInput}
                    currentCategories={Array.from(tracker.categoriesMap.keys())}/>

                <EditExpenseForm isVisible={tracker.editing ? true : false} onFinishedEditing={() => editExpense()} 
                onCancel={() => cancelEditingExpense()} onNameChange={changeNameEditChange} onAmountChange={changeAmountEditChange} 
                onDateChange={changeEditDate} onCategoryChange={changeCategoryEditInput} nameInput={tracker.nameInput} amountInput={tracker.amountEditInput} 
                dateInput={tracker.dateEditInput} categoryInput={tracker.categoryEditInput} currentCategories={Array.from(tracker.categoriesMap.keys())}/>

                <AllExpenses expenses={tracker.expenseDataList} onDelete={(e) => deleteExpense(e)} 
                categoriesAmountsEntries={Array.from(tracker.categoriesAmountsMap.entries())} onEdit={(e) => startEditingExpense(e)}/>

                <TotalExpenses allExpenses={tracker.allExpensesAmount}/>
            </div>
        )
}

export default App;