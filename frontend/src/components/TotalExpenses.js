import '../index.css';
import React from 'react';

// adding total expenses component
function TotalExpenses(props) {
    return (
            <div>
                <div>
                    
                </div>
                <div>
                    {/* FIXME move this to a separate function so that Expense.js and TotalExpense.js can call on it. */}
                    Total Expenses: $ {(Math.round(parseFloat(props.allExpenses) * 100) / 100).toFixed(2)}
                </div>
            </div>
        )
}

export default TotalExpenses;