import React from 'react';

/*Holds the details for a single expense*/
function Expense(props) {


    // FIXME, treat buttons like other table columns (make sure to reserve them)
    return (
        <tr>
            <td>{props.expenseName}</td>
            <td>{(Math.round(parseFloat(props.expenseAmount) * 100) / 100).toFixed(2)}</td>
            <td>{props.date}</td>
            <td>{props.expenseCategory}</td>
            <td><input id={props.id} type='button' value="Edit" onClick={(e) => props.onEdit(e)}/></td>
            <td><input id={props.id} type='button' value="Delete" onClick={(e) => props.onDelete(e)}/></td>
        </tr>
    )
}


export default Expense;