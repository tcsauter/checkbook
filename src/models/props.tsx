export interface RemainCardProps {
    initialAmount: number;
    totalSpent: number;
    setInitAmt: React.Dispatch<React.SetStateAction<number>>;
}

export interface CreditBalanceSummaryCardProps {
    accountName: string;
    amount: number;
}