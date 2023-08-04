// this is the form where one can add the total expenses
function EditExpenseForm(props) {
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

    if (!props.isVisible) {
        return null;
    } else {
        return (
                <div> 
                    <form> {/*Calls up to the handler in the app function*/}
                        <label>
                            Expense Name
                            {/*This changes the state of the instance as we change the input */}
                            <input type="text" placeholder="Name" value ={props.expenseName} onChange={handleNameChange}></input>
                        </label>    

                        <label>
                            Amount $
                            {/* This takes in an amount as an input*/}
                            <input type="number" min="0" step="0.01" value = {props.amountInput} onChange={handleAmountChange}></input>
                        </label>

                        <label>
                            Date
                            <input type="date" value={props.dateInput} onChange={handleDateChange}></input>
                        </label>

                        {/*https://stackoverflow.com/questions/14614702/html-combo-box-with-option-to-type-an-entry*/ }
                        <label>
                            Category
                            <input type="text" placeholder='Category' value={props.categoryInput} onChange={handleCategoryChange} name="categories" list="categoryList"></input>
                            <datalist id="categoryList">
                                {/*This will hold all the added categories that the user has already added*/}
                                {props.currentCategories.map(function(category, i) { 
                                    return <option value={category} key={i}>{category}</option>
                                    })}
                            </datalist>
                        </label>
                        
                        <input type="button" onClick={props.onFinishedEditing} value="Finish Editing" />          
                        <input type="button" onClick={props.onCancel} value="Cancel" />    
                    </form>
                </div>
            );
    }
}

export default EditExpenseForm;