import React, {useEffect, useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";
import {CreditBalanceSummaryCardProps} from "../../models/props";
import {AddNewExpenseCard} from "./components/AddNewExpenseCard";
import AccountModel from "../../models/AccountModel";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";

const baseUri = "http://localhost:8080";

export const HomePage: React.FC<{
    getAccountNameById: (id: string) => string | undefined,
    accountsArray: AccountModel[],
    budgetPeriod?: BudgetPeriodModel
}> = (props) => {
    const [expenseArray, setExpenseArray] = useState<ExpenseModel[]>([]);
    const [creditAccountSummaryArray, setCreditAccountSummaryArray] = useState<CreditBalanceSummaryCardProps[]>([]);
    const [remainCardInitAmt, setRemainCardInitAmt] = useState(0);
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
        const getExpenses = async () => {
            const expenses: ExpenseModel[] = []
            await fetch(baseUri + "/get/expenses" + dateParamString)
                .then(async response => {
                    if (!response.ok) {
                        console.log(response.statusText);
                    }

                    const responseJson = await response.json().then(value => value);

                    for (const key in responseJson) {
                        expenses.push({
                            id: responseJson[key]._id,
                            amount: responseJson[key].amount,
                            accountId: responseJson[key].accountId,
                            date: responseJson[key].date
                        });
                    }
                })
                .catch(reason => console.log(reason))

            return expenses;
        }

        getExpenses().then(value => setExpenseArray(value)).catch(reason => console.log(reason));
    }, [dateParamString])

    function calculateSpent(): number {
        let totalAmount: number = 0;
        expenseArray.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    async function addNewExpense(newExpense: ExpenseModel) {
        const newArray: ExpenseModel[] = [];
        await fetch(baseUri + "/add/expense" + dateParamString, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": newExpense.id,
                "amount": newExpense.amount,
                "accountId": newExpense.accountId,
                "date": newExpense.date
            })
        })
            .then(async response => {
                if (!response.ok) {
                    console.log(response.statusText);
                }

                const responseJson = await response.json().then(value => value);

                for (const key in responseJson) {
                    newArray.push({
                        id: responseJson[key]._id,
                        amount: responseJson[key].amount,
                        accountId: responseJson[key].accountId,
                        date: responseJson[key].date
                    });
                }
            })

        setExpenseArray(newArray);
    }

    async function updateExpense(expense: ExpenseModel) {
        const newArray: ExpenseModel[] = [];
        await fetch(baseUri + `/update/expense/${expense.id}` + dateParamString, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": expense.id,
                "accountId": expense.accountId,
                "amount": expense.amount,
                "date": expense.date
            })
        }).then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json().then(value => value);

            for (const key in responseJson) {
                newArray.push({
                    id: responseJson[key]._id,
                    accountId: responseJson[key].accountId,
                    amount: responseJson[key].amount,
                    date: responseJson[key].date
                })
            }
        })

        setExpenseArray(newArray);
    }

    async function deleteExpense(expenseId: string) {
        const newArray: ExpenseModel[] = [];
        await fetch(baseUri + `/delete/expense/${expenseId}` + dateParamString, {
            method: "DELETE"
        }).then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json().then(value => value);

            for (const key in responseJson) {
                newArray.push({
                    id: responseJson[key]._id,
                    accountId: responseJson[key].accountId,
                    amount: responseJson[key].amount,
                    date: responseJson[key].date
                })
            }
        })

        setExpenseArray(newArray);
    }

    async function clearExpenses() {
        await fetch(baseUri + "/clear/expenses" + dateParamString, {
            method: "DELETE"
        })
            .then(async response => {
                if (!response.ok) {
                    console.log(response.statusText);
                }

                const responseJson: boolean = await response.json();

                if (responseJson) {
                    setExpenseArray([]);
                }
            })
    }

    return (
        <div className='container bg-black vh-100 bg-opacity-75'>

            <AddNewExpenseCard accounts={props.accountsArray}
                               updateExpenses={addNewExpense}
            />

            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    {props.budgetPeriod ?
                        <RemainCard
                            input={{
                                initialAmount: props.budgetPeriod.startingAmt,
                                totalSpent: calculateSpent(),
                                setInitAmt: setRemainCardInitAmt
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
                            initialAmount: props.budgetPeriod.startingAmt,
                            totalSpent: calculateSpent(),
                            setInitAmt: setRemainCardInitAmt
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