// small object that stores data of an object

function expenseData(expenseName, expenseAmount) {
    this.expenseName = expenseName;
    this.expenseAmount = expenseAmount;
} // note that this is only a constructor for a object,
// it still needs to be fleshed out to have getters and setters