import '../index.css';
import React from 'react';

/*Holds the details for a single expense*/
function Expense(props) {
    return (<div>
                <div>{props.expenseName} {props.expenseAmount}</div>
                <input type='button' value="Delete" onClick={(e) => props.onDelete(e)}/>
            </div>
        )
}

export default Expense;