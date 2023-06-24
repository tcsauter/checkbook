import BudgetPeriodModel from "./BudgetPeriodModel";

export interface RemainCardProps {
    budgetPeriod: BudgetPeriodModel;
    updateBudgetPeriod: (bp: BudgetPeriodModel) => Promise<BudgetPeriodModel[]>;
    totalSpent: number;
    stillLoading: boolean;
}

export interface CreditBalanceSummaryCardProps {
    accountName: string;
    amount: number;
}