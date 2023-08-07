import React from 'react';

// adding total expenses component
function TotalExpenses(props) {
    return (
            <div>
                Total Expenses: $ {(Math.round(parseFloat(props.allExpenses) * 100) / 100).toFixed(2)}
            </div>
        )
}

export default TotalExpenses;