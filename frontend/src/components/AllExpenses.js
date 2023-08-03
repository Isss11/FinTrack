import '../index.css';
import React from 'react';
import Expense from './Expense';
import CategoryAmount from './CategoryEntry';

// creating div to hold all expenses elements
function AllExpenses(props) {
    return ( // only adding element name at the moment, id stores the id of the element to delete it (by the key)
            <div>
                <div>
                    <h2>All Expenses</h2>
                    {props.expenses.map(function(expense) {
                    return <Expense date={expense.date} expenseName={expense.name} expenseCategory={expense.category}
                        expenseAmount={expense.amount} key={expense.id} id={expense.id} onDelete={(e) => props.onDelete(e)}
                        onEdit={(e) => props.onEdit(e)}/>})}
                </div>
                <div>
                    <h2>Expenses by Category</h2>
                    {/*Adding category entries.*/}
                    {props.categoriesAmountsEntries.map(function(categoryEntry, i) {
                        return <CategoryAmount category={categoryEntry[0]} amount={categoryEntry[1]} key={i} ></CategoryAmount>
                    })}
                </div>
            </div>
        )
}

export default AllExpenses;