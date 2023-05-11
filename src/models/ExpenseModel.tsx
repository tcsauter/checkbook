class ExpenseModel {
    id: number;
    amount: number;
    accountId: number;
    date: string;

    constructor(
        id: number,
        amount: number,
        accountId: number,
        date: string
    ) {
        this.id = id;
        this.amount = amount;
        this.accountId = accountId;
        this.date = date;
    }
}

export default ExpenseModel;