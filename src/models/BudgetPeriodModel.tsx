class BudgetPeriodModel {
    id: string;
    payDate: string;
    budgetStart: string;
    budgetEnd: string;
    startingAmt: number;

    constructor(
        id: string,
        payDate: string,
        budgetStart: string,
        budgetEnd: string,
        startingAmt: number
    ) {
        this.id = id;
        this.payDate = payDate;
        this.budgetStart = budgetStart;
        this.budgetEnd = budgetEnd;
        this.startingAmt = startingAmt;
    }
}

export default BudgetPeriodModel;