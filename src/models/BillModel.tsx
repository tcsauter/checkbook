class BillModel {
    id: string;
    description: string;
    amount: number;
    frequency: string;
    due: string;
    isPaidInInstallments: boolean;
    paidSoFar: number;
    isPaidFromBudget: boolean;
    comment: string;

    constructor(
        id: string,
        description: string,
        amount: number,
        frequency: string,
        due: string,
        isPaidInInstallments: boolean,
        paidSoFar: number,
        isPaidFromBudget: boolean,
        comment: string
    ) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.frequency = frequency;
        this.due = due;
        this.isPaidInInstallments = isPaidInInstallments;
        this.paidSoFar = paidSoFar;
        this.isPaidFromBudget = isPaidFromBudget;
        this.comment = comment;
    }
}

export default BillModel;