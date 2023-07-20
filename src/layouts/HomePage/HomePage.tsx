import React, {useEffect, useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";
import {CreditBalanceSummaryCardProps} from "../../models/props";
import {AddNewExpenseCard} from "./components/AddNewExpenseCard";
import AccountModel from "../../models/AccountModel";
import {addNewExpense, expenseDelete, expensesClear, expenseUpdate, getExpenses} from "../../utils/expenseUtil";
import {useLoaderData, useParams, useRouteLoaderData} from "react-router-dom";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {updateBudgetPeriod} from "../../utils/budgetPeriodUtil";

interface HomeParams {
    params: {
        startDate?: string,
        endDate?: string
    }
}

export async function loader({ params }: HomeParams) {
    //get expenses
    const expenses = await getExpenses(params.startDate && params.endDate ?
        `?startDate=${params.startDate}&endDate=${params.endDate}` : "");

    return { expenses };
}

export async function action({ params, request }: { params: any, request: any }) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const dateParamString: string = params.startDate && params.endDate ? `?startDate=${params.startDate}&endDate=${params.endDate}` : "";

    if(intent === "addExpense"){
        const amt: number = Number(formData.get("newExpenseAmt"));
        const acct: string = formData.get("newExpenseAcct");
        const date: string = formData.get("newExpenseDate");

        await addNewExpense({
            id: Date.now().toString(),
            amount: amt,
            accountId: acct,
            date: date
        }, dateParamString);
    }

    if(intent === "updateBudgetPeriod") {
        const bp: BudgetPeriodModel = JSON.parse(formData.get("budgetPeriod"));

        await updateBudgetPeriod(bp);
    }

    if(intent === "updateExpenseAmt") {
        const expense: ExpenseModel = JSON.parse(formData.get("expense"));

        await expenseUpdate(expense, dateParamString);
    }

    if(intent === "deleteExpense") {
        const id = formData.get("id");

        await expenseDelete(id, dateParamString);
    }

    if(intent === "clearExpenses") {
        await expensesClear();
    }
}

export const HomePage = () => {
    const params = useParams();
    const { expenses } = useLoaderData() as { expenses: ExpenseModel[] };
    const { accounts } = useRouteLoaderData("root") as { accounts: AccountModel[] };

    const [creditAccountSummaryArray, setCreditAccountSummaryArray] = useState<CreditBalanceSummaryCardProps[]>([]);

    useEffect(() => {
        setCreditAccountSummaryArray(accounts.filter(account => account.type === "Credit")
            .map((account) => {
                const expensesCopy: ExpenseModel[] = expenses.slice();
                let totalAmt: number = 0;
                expensesCopy.filter((expense) => expense.accountId === account.id)
                    .map((expense) => totalAmt += expense.amount);
                return ({accountName: account.name, amount: totalAmt});
            }))
    }, [accounts, expenses])

    function calculateSpent(): number {
        let totalAmount: number = 0;
        expenses.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    return (
        <div className='container bg-black min-vh-100 bg-opacity-75'>

            <AddNewExpenseCard />

            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    {params.startDate && params.endDate ?
                        <RemainCard
                            input={{
                                totalSpent: calculateSpent()
                            }}
                        />
                        :
                        <></>
                    }
                    <CreditBalanceSummaryCard
                        creditAccountSummaryArray={creditAccountSummaryArray}
                    />
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard />
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                {params.startDate && params.endDate ?
                    <RemainCard
                        input={{
                            totalSpent: calculateSpent(),
                        }}
                    />
                    :
                    <></>
                }
                <CreditBalanceSummaryCard
                    creditAccountSummaryArray={creditAccountSummaryArray}
                />
                <DetailsCard />
            </div>
        </div>
    );
}