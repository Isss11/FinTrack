import '../index.css';
import React from 'react';

/*Holds the details for a single expense*/
function Expense(props) {
    return (<div>
                <div>{props.date} {props.expenseName} ${props.expenseAmount} {props.expenseCategory}</div>
                <input id={props.id} type='button' value="Delete" onClick={(e) => props.onDelete(e)}/>
                <input id={props.id} type='button' value="Edit" onClick={(e) => props.onEdit(e)}/>
            </div>
        )
}

export default Expense;