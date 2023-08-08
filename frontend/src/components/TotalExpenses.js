import React from 'react';

// adding total expenses component
function TotalExpenses(props) {
    return (
            <div>
                <h3 className='container bg-light'>
                    <div><strong>Total Amount Spent:</strong> $ {(Math.round(parseFloat(props.allExpenses) * 100) / 100).toFixed(2)}</div>
                </h3>
            </div>
        )
}

export default TotalExpenses;