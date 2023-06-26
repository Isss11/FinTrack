import '../index.css';
import React from 'react';

// adding total expenses component
function TotalExpenses(props) {
    return (
            <div>
                <div>
                    
                </div>
                <div>
                    Total Expenses: $ {props.allExpenses}
                </div>
            </div>
        )
}

export default TotalExpenses;