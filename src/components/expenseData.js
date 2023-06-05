// this class will hold all the relevant data for a single expense that was input (not a React component)

class ExpenseData {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    get _name() { // need to avoid recursive call problem with getter and setters (why _name, and not name)
        return this.name;
    }

    set _name(_name) {
        this.name = _name;
    }

    get _amount() {
        return this.amount;
    }

    set _amount(_amount) {
        this.amount = _amount;
    }
}

export default ExpenseData;