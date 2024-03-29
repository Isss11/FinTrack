// this is the form where one can add the total expenses
function ExpensesForm(props) {
    function handleNameChange(e) {
        props.onNameChange(e.target.value);
    }

    function handleAmountChange(e) { 
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
                    <div className="d-block">
                        <label className="form-label"><strong>Expense Name</strong></label>
                        {/*This changes the state of the instance as we change the input */}
                        <input className="form-control" type="text" placeholder="Name" value ={props.nameInput} onChange={handleNameChange}></input> 
                    </div>
                    

                    <div className="d-block">
                        <label className="form-label"><strong>Amount</strong></label>
                        {/* This takes in an amount as an input*/}
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input className="form-control" type="number" min="0" step="0.01" value = {props.amountInput} onChange={handleAmountChange}></input>
                        </div>
                    </div>

                    <div className="d-block">
                        <label className="form-label"><strong>Date</strong></label>
                        <input className="form-control" type="date" value={props.dateInput} onChange={handleDateChange}></input>
                    </div>

                    {/*https://stackoverflow.com/questions/14614702/html-combo-box-with-option-to-type-an-entry*/ }
                    <div className="d-block">
                        <label className="form-label"><strong>Category</strong></label>
                        <input className="form-control" type="text" placeholder='Category' value={props.categoryInput} onChange={handleCategoryChange} name="categories" list="categoryList"></input>
                        <datalist id="categoryList">
                            {/*This will hold all the added categories that the user has already added*/}
                            {props.currentCategories.map(function(category, i) { 
                                return <option value={category} key={i}>{category}</option>
                                })}
                        </datalist>
                    </div>
                    
                    {/* Using hidden attribute on HTML elements to conditionaly render the different button components. This is to differentiate between regular (first) and
                    editing forms (second) */}
                    <div className="d-grid">
                        <input type="button" hidden={props.editingForm} className="btn btn-primary btn-outline-dark rounded-pill mt-3 mb-3 text-white" onClick={props.onClick} value="Add" />
                    </div>  

                    <div className="d-grid">
                        <input type="button" hidden={!props.editingForm} className="btn btn-primary btn-outline-dark rounded-pill mt-3 mb-3 text-white" onClick={props.onFinishedEditing} value="Finish Editing" />          
                        <input type="button" hidden={!props.editingForm} className="btn btn-light btn-outline-dark rounded-pill mt-3 mb-3" onClick={props.onCancel} value="Cancel" />   
                    </div> 
                </form>
            </div>
        );
    }
}

export default ExpensesForm;