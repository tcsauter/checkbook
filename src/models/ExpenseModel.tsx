class ExpenseModel {
    id: string;
    amount: number;
    accountId: string;
    date: string;

    constructor(
        id: string,
        amount: number,
        accountId: string,
        date: string
    ) {
        this.id = id;
        this.amount = amount;
        this.accountId = accountId;
        this.date = date;
    }
}

export default ExpenseModel;