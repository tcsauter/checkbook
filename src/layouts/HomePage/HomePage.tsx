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
    updateBudgetPeriod: (bp: BudgetPeriodModel) => Promise<BudgetPeriodModel[]>,
    accountsLoading: boolean;
}> = (props) => {
    const [expenseArray, setExpenseArray] = useState<ExpenseModel[]>([]);
    const [expensesLoading, setExpensesLoading] = useState(false);
    const [expensesError, setExpensesError] = useState(false);
    const [expensesErrorString, setExpensesErrorString] = useState("");
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
        setExpensesLoading(true);
        getExpenses(dateParamString)
            .then(expenses => {
                setExpenseArray(expenses);
                setExpensesLoading(false);
            }).catch(reason => {
            setExpensesError(true);
            setExpensesErrorString(reason.toString())
        });
    }, [dateParamString])

    function calculateSpent(): number {
        let totalAmount: number = 0;
        expenseArray.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    function addExpense(expense: ExpenseModel) {
        setExpensesLoading(true);
        addNewExpense(expense, dateParamString)
            .then(expenses => {
                setExpenseArray(expenses);
                setExpensesLoading(false);
            }).catch(reason => {
            setExpensesError(true);
            setExpensesErrorString(reason.toString());
        });
    }

    async function updateExpense(expense: ExpenseModel) {
        setExpensesLoading(true);
        expenseUpdate(expense, dateParamString)
            .then(expenses => {
                setExpenseArray(expenses);
                setExpensesLoading(false);
            }).catch(reason => {
            setExpensesError(true);
            setExpensesErrorString(reason.toString());
        });
    }

    async function deleteExpense(expenseId: string) {
        setExpensesLoading(true);
        expenseDelete(expenseId, dateParamString)
            .then(expenses => {
                setExpenseArray(expenses);
                setExpensesLoading(false);
            }).catch(reason => {
            setExpensesError(true);
            setExpensesErrorString(reason.toString());
        });
    }

    async function clearExpenses() {
        setExpensesLoading(true);
        expensesClear()
            .then(success => {
                if (success) {
                    setExpenseArray([]);
                    setExpensesLoading(false);
                } else {
                    setExpensesLoading(false);
                }
            }).catch(reason => {
                setExpensesError(true);
                setExpensesErrorString(reason.toString());
        })
    }

    if (expensesError) {
        return (
            <div className="card">
                <h1 className="card-header">!Error!</h1>
                <p className="card-body">{expensesErrorString}</p>
            </div>
        )
    }

    return (
        <div className='container bg-black vh-100 bg-opacity-75'>

            <AddNewExpenseCard accounts={props.accountsArray}
                               updateExpenses={addExpense}
                               accountsLoading={props.accountsLoading}
            />

            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    {props.budgetPeriod ?
                        <RemainCard
                            input={{
                                budgetPeriod: props.budgetPeriod,
                                updateBudgetPeriod: props.updateBudgetPeriod,
                                totalSpent: calculateSpent(),
                                stillLoading: expensesLoading
                            }}
                        />
                        :
                        <></>
                    }
                    <CreditBalanceSummaryCard
                        creditAccountSummaryArray={creditAccountSummaryArray}
                        stillLoading={expensesLoading || props.accountsLoading}
                    />
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                                 updateExpense={updateExpense} accountsArray={props.accountsArray}
                                 deleteExpense={deleteExpense} clearExpenses={clearExpenses}
                                 stillLoading={expensesLoading || props.accountsLoading}/>
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                {props.budgetPeriod ?
                    <RemainCard
                        input={{
                            budgetPeriod: props.budgetPeriod,
                            updateBudgetPeriod: props.updateBudgetPeriod,
                            totalSpent: calculateSpent(),
                            stillLoading: expensesLoading
                        }}
                    />
                    :
                    <></>
                }
                <CreditBalanceSummaryCard
                    creditAccountSummaryArray={creditAccountSummaryArray}
                    stillLoading={expensesLoading || props.accountsLoading}
                />
                <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                             updateExpense={updateExpense} accountsArray={props.accountsArray}
                             deleteExpense={deleteExpense} clearExpenses={clearExpenses}
                             stillLoading={expensesLoading || props.accountsLoading}/>
            </div>
        </div>
    );
}