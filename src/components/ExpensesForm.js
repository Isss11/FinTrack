import '../index.css';
import React from 'react';

// this is the form where one can add the total expenses
class ExpensesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseName: '',
            expenseAmount: '' // will be defined given user input
        };
        
        // part of this was taken out of the React tutorial
        // https://reactjs.org/docs/forms.html
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        
    }

    handleNameChange(event) {
        this.setState({expenseName: event.target.value}); // note that I'm importing from event.target.value (value is a keyword, not a variable name)
    }

    handleAmountChange(event) {
        this.setState({expenseAmount: event.target.value}); // parses out numeric value
    }

    

    render () {
        return (
            <div> 
                <form onSubmit={() => this.props.onSubmit}> {/*Calls up to the handler in the app function*/}
                    <label>
                        Expenses Name
                        {/*This changes the state of the instance as we change the input */}
                        <input type="text" value ={this.state.expenseName} onChange={this.handleNameChange}></input>
                    </label>    

                    <label>
                        Amount
                        {/* This takes in an amount as an input*/}
                        <input type="text" value = {this.state.expenseAmount} onChange={this.handleAmountChange}></input>
                    </label>
                    <input type="submit" value="Add" />          
                </form>
            </div>
        )
    };
}

export default ExpensesForm;