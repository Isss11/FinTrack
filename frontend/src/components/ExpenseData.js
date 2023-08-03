// this class will hold all the relevant data for a single expense that was input (not a React component)

class ExpenseData {
    constructor(name, amount, date, category, id) {
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.id = id;
    }

    get _name() {
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
    
    get _date() {
        return this.date;
    }

    set _date(_date) {
        this.date = _date;
    }

    get _category() {
        return this.category;
    }

    set _category(_category) {
        this.category = _category;
    }

    get _id() {
        return this.id;
    }

    set _id(_id) {
        this.id = _id;
    }
}

export default ExpenseData;