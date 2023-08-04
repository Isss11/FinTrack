import React from 'react';

/*Holds the details for a single expense*/
function Expense(props) {
    return (<div className='d-block'>
                <div className='d-inline'>{props.date} {props.expenseName} ${(Math.round(parseFloat(props.expenseAmount) * 100) / 100).toFixed(2)} {props.expenseCategory}</div>
                <input id={props.id} type='button' value="Delete" onClick={(e) => props.onDelete(e)}/>
                <input id={props.id} type='button' value="Edit" onClick={(e) => props.onEdit(e)}/>
            </div>
        )
}


export default Expense;