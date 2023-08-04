import React from 'react';
import Expense from './Expense';
import CategoryAmount from './CategoryEntry';

// creating div to hold all expenses elements
function AllExpenses(props) {
    return ( // only adding element name at the moment, id stores the id of the element to delete it (by the key)
            <div>
                <div>
                    <h2>All Expenses</h2>
                    {/**Will add table front-end implementation later */}
                    <table className='table'>
                        <thead>
                            <th>Name</th>
                            <th>Amount ($)</th>
                            <th>Date</th>
                            <th>Category</th>
                            {/** Reserving space for the edit button and delete button to put under these table headers */}
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            {/**This is a mapping function that goes through each provided expense, and then maps it to an element (will need to make it a tr element in the future*/}
                            {props.expenses.map(function(expense) {
                            return <Expense date={expense.date} expenseName={expense.name} expenseCategory={expense.category}
                                expenseAmount={expense.amount} key={expense.id} id={expense.id} onDelete={(e) => props.onDelete(e)}
                                onEdit={(e) => props.onEdit(e)}/>})}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2>Expenses by Category</h2>
                    {props.categoriesAmountsEntries.map(function(categoryEntry, i) {
                        return <CategoryAmount category={categoryEntry[0]} amount={categoryEntry[1]} key={i} ></CategoryAmount>
                    })}
                </div>
            </div>
        )
}

export default AllExpenses;