import AllExpenses from "./AllExpenses.js";
import ExpensesForm from "./ExpensesForm.js";
import EditExpenseForm from './EditExpenseForm';
import TotalExpenses from "./TotalExpenses.js";
import { useEffect, useState } from 'react';
import axios from "axios" // to interface with back-end

// creates app page -- to include in another file later
function App(props) {
    const [tracker, setTracker] = useState({
        allExpensesAmount: 0,
        expenseDataList: [],
        categoryMap: [],
        nameInput: '',
        amountInput: '',
        dateInput: getCurrentDate(),
        categoryInput: '',
        nameEditInput: '',
        amountEditInput: '',
        dateEditInput: getCurrentDate(),
        categoryEditInput: '',
        categoriesMap: [],
        categoriesAmountsMap: [],
        editing: false,
        editedExpense: -1
    });

    // Loads up list of expenses on first render to trigger calculateTotalExpenses and calculateCategoryAmounts
    useEffect(reloadLists, []);

    useEffect(calculateTotalExpenses, [tracker.expenseDataList]);
    useEffect(calculateCategoryAmounts, [tracker.expenseDataList]);


    // every time expenseDataList is changed, total expenses are re-calculated
    function calculateTotalExpenses() {
        // https://stackoverflow.com/questions/54119678/is-usestate-synchronous
        let calculatedAmount = 0;

        tracker.expenseDataList.forEach(expense => {calculatedAmount += Number(expense.amount)});
        setTracker(previousState => {return {...previousState, allExpensesAmount: calculatedAmount}});
    }

    // resets non-editing input fields back to their default values
    function resetInputFields() {
        setTracker(previousState => {return {...previousState, nameInput: ""}});
        setTracker(previousState => {return {...previousState, amountInput: 0}});
        setTracker(previousState => {return {...previousState, nameInput: getCurrentDate()}});
        setTracker(previousState => {return {...previousState, nameInput: ''}});
    }

    // gets the current date and returns in the proper format for the HTML object
    function getCurrentDate() {
        let currentTimeString = new Date().toLocaleString();
        let currentDateString = currentTimeString.substring(0, 10); // parsing out just the date

        return currentDateString;
    }

    // Reloads the lists based on updated database information.
    function reloadLists() {
        axios.get("/api/expenses/").then((response) => (setTracker(previousState => {return {
            ...previousState, expenseDataList: response.data
        }})));
    }

    // Creates HashMap for category expenses to display.
    function calculateCategoryAmounts() {
        let newCategoryMap = new Map();
        let prevAmount;
        let newAmount;

        // Iterates through current expense data list, creating mappings of expenses
        for (let i = 0; i < tracker.expenseDataList.length; ++i) {

            prevAmount = Number(newCategoryMap.get(tracker.expenseDataList[i].category));

            // Check to see if category hasn't been created as a mapped value in newCategoryMap.
            if (!!prevAmount) {
                newAmount = prevAmount + Number(tracker.expenseDataList[i].amount);
            } else {
                newAmount = Number(tracker.expenseDataList[i].amount);
            }

            newCategoryMap.set(tracker.expenseDataList[i].category, newAmount);
        }

        setTracker(previousState => {return {...previousState, categoryMap: newCategoryMap}});
    }

    // adds a new expense and appends it to the list
    function addExpense() {
        resetInputFields();

        let expenseObject = {
            name: tracker.nameInput,
            amount: tracker.amountInput,
            date: tracker.dateInput,
            category: tracker.categoryInput,
        }

        console.log(Object.values(expenseObject));

        // input validation to check for empty fields
        for (let key in expenseObject) {
            if (expenseObject[key] === '') {
                return alert("You left a field empty.");
            }
        }

        // resetting list with appended value
        axios.post("/api/expenses/", expenseObject).then(() => reloadLists());
    }

    // deletes an expense, given an index
    function deleteExpense(e) {
        let removeID = e.target.id;
        axios.delete(`/api/expenses/${removeID}/`).then(() => reloadLists())
    }

    // Called when expense has been edited.
    function editExpense() {
        // taking currently edited expense and changing it to the input box values
        
        let updatedObject = {
            name: tracker.nameEditInput,
            amount: tracker.amountEditInput,
            date: tracker.dateEditInput,
            category: tracker.categoryEditInput,
        }

       axios.put(`/api/expenses/${tracker.editedExpense}/`, updatedObject).then(() => reloadLists());

        setTracker(previousState => {return {...previousState, editing: false}});
        setTracker(previousState => {return {...previousState, editedExpense: -1}});
    }

    function startEditingExpense(e) {
        let editID = e.target.id;
        let accessIndex;
        
        for (let i = 0; i < tracker.expenseDataList.length; ++i) {
            if (tracker.expenseDataList[i].id === editID) {
                accessIndex = i;
                break;
            }
        }

        let expenseInfo = tracker.expenseDataList[accessIndex];
        
        setTracker(previousState => {return {...previousState, editing: true}});
        setTracker(previousState => {return {...previousState, editedExpense: editID}});

        // loading up edit input boxes with existing values of object that we're editing
        setTracker(previousState => {return {...previousState, nameEditInput: expenseInfo.name}});
        setTracker(previousState => {return {...previousState, amountEditInput: expenseInfo.amount}});
        setTracker(previousState => {return {...previousState, dateEditInput: expenseInfo.date}});
        setTracker(previousState => {return {...previousState, categoryEditInput: expenseInfo.category}});
    }

    function cancelEditingExpense() {
        setTracker(previousState => {return {...previousState, editing: false}});
    }

    function changeNameChange(name) {
        setTracker(previousState => {return {...previousState, nameInput: name}});
    }

    function changeAmountChange(amount) {
        setTracker(previousState => {return {...previousState, amountInput: amount}});
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
            <div className="container">
                <h1>Expense Tracker</h1>

                <ExpensesForm isVisible={tracker.editing ? false : true} onClick={() => addExpense()} onNameChange={changeNameChange} 
                onAmountChange={changeAmountChange} onDateChange={changeDate} onCategoryChange={changeCategoryInput} 
                nameInput={tracker.nameInput} amountInput={tracker.amountInput} dateInput={tracker.dateInput} categoryInput={tracker.categoryInput}
                    currentCategories={Array.from(tracker.categoriesMap.keys())}/>

                <EditExpenseForm isVisible={tracker.editing ? true : false} onFinishedEditing={() => editExpense()} 
                onCancel={() => cancelEditingExpense()} onNameChange={changeNameEditChange} onAmountChange={changeAmountEditChange} 
                onDateChange={changeEditDate} onCategoryChange={changeCategoryEditInput} nameInput={tracker.nameEditInput} amountInput={tracker.amountEditInput} 
                dateInput={tracker.dateEditInput} categoryInput={tracker.categoryEditInput} currentCategories={Array.from(tracker.categoriesMap.keys())}/>

                <AllExpenses expenses={tracker.expenseDataList} onDelete={(e) => deleteExpense(e)} 
                categoriesAmountsEntries={Array.from(tracker.categoryMap.entries())} onEdit={(e) => startEditingExpense(e)}/>

                <TotalExpenses allExpenses={tracker.allExpensesAmount}/>
            </div>
        );
}

export default App;