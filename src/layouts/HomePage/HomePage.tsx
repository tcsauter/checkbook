import React, {useEffect, useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";
import {CreditBalanceSummaryCardProps} from "../../models/props";
import {AddNewExpenseCard} from "./components/AddNewExpenseCard";
import AccountModel from "../../models/AccountModel";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {addNewExpense, expenseDelete, expensesClear, expenseUpdate, getExpenses} from "../../utils/expenseUtil";

export const HomePage: React.FC<{
    getAccountNameById: (id: string) => string | undefined,
    accountsArray: AccountModel[],
    budgetPeriod?: BudgetPeriodModel,
    updateBudgetPeriod: (bp: BudgetPeriodModel) => Promise<BudgetPeriodModel[]>
}> = (props) => {
    const [expenseArray, setExpenseArray] = useState<ExpenseModel[]>([]);
    const [creditAccountSummaryArray, setCreditAccountSummaryArray] = useState<CreditBalanceSummaryCardProps[]>([]);
    const [dateParamString, setDateParamString] = useState("");

    useEffect(() => {
        setCreditAccountSummaryArray(props.accountsArray.filter(account => account.type === "Credit")
            .map((account) => {
                const expensesCopy: ExpenseModel[] = expenseArray.slice();
                let totalAmt: number = 0;
                expensesCopy.filter((expense) => expense.accountId === account.id)
                    .map((expense) => totalAmt += expense.amount);
                return ({accountName: account.name, amount: totalAmt});
            }))
    }, [props.accountsArray, expenseArray])

    useEffect(() => {
        setDateParamString(
            props.budgetPeriod ?
                "?startDate=" + props.budgetPeriod.budgetStart + "&endDate=" + props.budgetPeriod.budgetEnd : ""
        )
    }, [props.budgetPeriod])

    useEffect(() => {
        getExpenses(dateParamString).then(value => setExpenseArray(value)).catch(reason => console.log(reason));
    }, [dateParamString])

    function calculateSpent(): number {
        let totalAmount: number = 0;
        expenseArray.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    async function addExpense(expense: ExpenseModel) {
        setExpenseArray(await addNewExpense(expense, dateParamString));
    }

    async function updateExpense(expense: ExpenseModel) {
        setExpenseArray(await expenseUpdate(expense, dateParamString));
    }

    async function deleteExpense(expenseId: string) {
        setExpenseArray(await expenseDelete(expenseId, dateParamString));
    }

    async function clearExpenses() {
        if(await expensesClear()) {
            setExpenseArray([]);
        }
    }

    return (
        <div className='container bg-black vh-100 bg-opacity-75'>

            <AddNewExpenseCard accounts={props.accountsArray}
                               updateExpenses={addExpense}
            />

            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    {props.budgetPeriod ?
                        <RemainCard
                            input={{
                                budgetPeriod: props.budgetPeriod,
                                updateBudgetPeriod: props.updateBudgetPeriod,
                                totalSpent: calculateSpent()
                            }}
                        />
                        :
                        <></>
                    }
                    <CreditBalanceSummaryCard creditAccountSummaryArray={creditAccountSummaryArray}/>
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                                 updateExpense={updateExpense} accountsArray={props.accountsArray}
                                 deleteExpense={deleteExpense} clearExpenses={clearExpenses}/>
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                {props.budgetPeriod ?
                    <RemainCard
                        input={{
                            budgetPeriod: props.budgetPeriod,
                            updateBudgetPeriod: props.updateBudgetPeriod,
                            totalSpent: calculateSpent()
                        }}
                    />
                    :
                    <></>
                }
                <CreditBalanceSummaryCard creditAccountSummaryArray={creditAccountSummaryArray}/>
                <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                             updateExpense={updateExpense} accountsArray={props.accountsArray}
                             deleteExpense={deleteExpense} clearExpenses={clearExpenses}/>
            </div>
        </div>
    );
}