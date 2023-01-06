import '../index.css';
import React from 'react';

// adding total expenses component
class TotalExpenses extends React.Component {
    render () {
        return (
            <div>
                <div>
                    Total Expenses: $ {this.props.allExpenses}
                </div>
            </div>
        )
    };
}

export default TotalExpenses;