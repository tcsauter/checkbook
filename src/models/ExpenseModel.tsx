class ExpenseModel {
    id: number;
    amount: number;
    accountId: number;
    date: Date;

    constructor(
        id: number,
        amount: number,
        accountId: number,
        date: Date
    ) {
        this.id = id;
        this.amount = amount;
        this.accountId = accountId;
        this.date = date;
    }
}

export default ExpenseModel;