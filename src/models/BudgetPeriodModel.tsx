class BudgetPeriodModel {
    id: string;
    payDate: string;
    budgetStart: string;
    budgetEnd: string;

    constructor(
        id: string,
        payDate: string,
        budgetStart: string,
        budgetEnd: string
    ) {
        this.id = id;
        this.payDate = payDate;
        this.budgetStart = budgetStart;
        this.budgetEnd = budgetEnd;
    }
}

export default BudgetPeriodModel;