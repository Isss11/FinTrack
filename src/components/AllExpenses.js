import '../index.css';
import React from 'react';
import Expense from './Expense';

// creating div to hold all expenses elements
function AllExpenses(props) {
    return ( // only adding element name at the moment, id stores the id of the element to delete it (by the key)
            <div>
                {props.expenses.map(function(expense, i) {
                return <Expense date={expense.date} expenseName={expense.name} expenseAmount={expense.amount} key={i} id={i}
                    onDelete={(e) => props.onDelete(e)}
                />
                })}
            </div>
        )
}

export default AllExpenses;