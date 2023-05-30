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

   handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleAmountChange(e) { // state has been lifted up
        this.props.onAmountChange(e.target.value);
    } 

    render () { // note the constant references held here
        return (
            <div> 
                <form> {/*Calls up to the handler in the app function*/}
                    <label>
                        Expenses Name
                        {/*This changes the state of the instance as we change the input */}
                        <input type="text" value ={this.state.nameInput} onChange={this.handleNameChange}></input>
                    </label>    

                    <label>
                        Amount
                        {/* This takes in an amount as an input*/}
                        <input type="text" value = {this.props.amountInput} onChange={this.handleAmountChange}></input>
                    </label>
                    <input type="button" onClick={this.props.onClick} value="Add" />          
                </form>
            </div>
        )
    };
}

export default ExpensesForm;