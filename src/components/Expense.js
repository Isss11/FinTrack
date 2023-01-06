import '../index.css';
import React from 'react';

/*Holds the details for a single expense*/
class Expense extends React.Component {
    render () { // given a set of values, it renders the element (controlled component)
        return (
            <div>
                <div>this.props.expenseName</div><div>this.props.expenseAmount</div>
            </div>
        )
    }
}

export default Expense;