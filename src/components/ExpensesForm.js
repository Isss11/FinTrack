import '../index.css';

// this is the form where one can add the total expenses
function ExpensesForm(props) {
    function handleNameChange(e) {
        props.onNameChange(e.target.value);
    }

    function handleAmountChange(e) { 
        // state has been lifted up
        props.onAmountChange(e.target.value);
    } 

    function handleDateChange(e) {
        props.onDateChange(e.target.value);
    }

    function handleCategoryChange(e) {
        props.onCategoryChange(e.target.value);
    }

    return (
            <div> 
                <form> {/*Calls up to the handler in the app function*/}
                    <label>
                        Expenses Name
                        {/*This changes the state of the instance as we change the input */}
                        <input type="text" placeholder="Enter a name." value ={props.expenseName} onChange={handleNameChange}></input>
                    </label>    

                    <label>
                        Amount $
                        {/* This takes in an amount as an input*/}
                        <input type="number" min="0" step="0.01" value = {props.amountInput} onChange={handleAmountChange}></input>
                    </label>

                    {/*FIXME some issue with uncontrolled to controlled components with dates (see in console log)*/}
                    <label>
                        Date
                        <input type="date" value={props.dateInput} onChange={handleDateChange}></input>
                    </label>

                    {/*https://stackoverflow.com/questions/14614702/html-combo-box-with-option-to-type-an-entry*/ }
                    <input type="text" value={props.categoryInput} onChange={handleCategoryChange} name="categories" list="categoryList"></input>
                    <datalist id="categoryList">
                        {/*This will hold all the added categories that the user has already added*/}
                    </datalist>
                    
                    <input type="button" onClick={props.onClick} value="Add" />          
                </form>
            </div>
        )
}

export default ExpensesForm;