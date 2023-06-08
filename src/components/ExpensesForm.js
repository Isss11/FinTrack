import '../index.css';

// this is the form where one can add the total expenses
function ExpensesForm(props) {
    function handleNameChange(e) {
        props.onNameChange(e.target.value);
    }

    function handleAmountChange(e) { // state has been lifted up
        props.onAmountChange(e.target.value);
    } 

    return (
            <div> 
                <form> {/*Calls up to the handler in the app function*/}
                    <label>
                        Expenses Name
                        {/*This changes the state of the instance as we change the input */}
                        <input type="text" value ={props.expenseName} onChange={handleNameChange}></input>
                    </label>    

                    <label>
                        Amount
                        {/* This takes in an amount as an input*/}
                        <input type="text" value = {props.amountInput} onChange={handleAmountChange}></input>
                    </label>
                    <input type="button" onClick={props.onClick} value="Add" />          
                </form>
            </div>
        )
}

export default ExpensesForm;