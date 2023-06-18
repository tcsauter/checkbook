import BudgetPeriodModel from "./BudgetPeriodModel";

export interface RemainCardProps {
    budgetPeriod: BudgetPeriodModel,
    totalSpent: number;
}

export interface CreditBalanceSummaryCardProps {
    accountName: string;
    amount: number;
}