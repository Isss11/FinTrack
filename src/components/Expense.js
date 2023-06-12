import '../index.css';
import React from 'react';

/*Holds the details for a single expense*/
function Expense(props) {
    return (<div>
                <div>{props.date} {props.expenseName} ${props.expenseAmount} {props.category}</div>
                <input id={props.id} type='button' value="Delete" onClick={(e) => props.onDelete(e)}/>
            </div>
        )
}

export default Expense;