import '../index.css';
import React from 'react';
import Expense from './Expense';

// creating div to hold all expenses elements
class AllExpenses extends React.Component {
    render () {
        return ( // only adding element name at the moment
            <div>
                {this.props.expenses.map(function(expense, i) {
                    console.log(expense.name, expense.amount)
                return <Expense expenseName={expense.name} expenseAmount={expense.amount} key={i}/>
                })}
            </div>
        )
    };
}

export default AllExpenses;