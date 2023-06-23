import BudgetPeriodModel from "./BudgetPeriodModel";

export interface RemainCardProps {
    budgetPeriod: BudgetPeriodModel;
    updateBudgetPeriod: (bp: BudgetPeriodModel) => Promise<BudgetPeriodModel[]>;
    totalSpent: number;
}

export interface CreditBalanceSummaryCardProps {
    accountName: string;
    amount: number;
}