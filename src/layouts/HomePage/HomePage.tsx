import React, {useEffect, useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";
import {CreditBalanceSummaryCardProps} from "../../models/props";
import {AddNewExpenseCard} from "./components/AddNewExpenseCard";
import AccountModel from "../../models/AccountModel";

export const HomePage: React.FC<{
    getAccountNameById: (id: string) => string | undefined,
    accountsArray: AccountModel[]
}> = (props) => {
    const [expenseArray, setExpenseArray] = useState<ExpenseModel[]>([]);
    const [creditAccountSummaryArray, setCreditAccountSummaryArray] = useState<CreditBalanceSummaryCardProps[]>([]);
    const [remainCardInitAmt, setRemainCardInitAmt] = useState(0);

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
        const getExpenses = async () => {
            const expenses: ExpenseModel[] = []
            await fetch("http://192.168.1.135:8080/get/expenses")
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
    }, [])

    function calculateSpent(): number {
        let totalAmount: number = 0;
        expenseArray.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    async function addNewExpense(newExpense: ExpenseModel) {
        const newArray: ExpenseModel[] = [];
        await fetch("http://192.168.1.135:8080/add/expense", {
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

    return (
        <div className='container bg-black vh-100 bg-opacity-75'>

            <AddNewExpenseCard accounts={props.accountsArray}
                               updateExpenses={addNewExpense}
            />

            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    <RemainCard
                        input={{
                            initialAmount: remainCardInitAmt ? remainCardInitAmt : 550,
                            totalSpent: calculateSpent(),
                            setInitAmt: setRemainCardInitAmt
                        }}
                    />
                    <CreditBalanceSummaryCard creditAccountSummaryArray={creditAccountSummaryArray}/>
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                                 updateExpense={setExpenseArray} accountsArray={props.accountsArray}/>
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                <RemainCard
                    input={{
                        initialAmount: remainCardInitAmt ? remainCardInitAmt : 550,
                        totalSpent: calculateSpent(),
                        setInitAmt: setRemainCardInitAmt
                    }}
                />
                <CreditBalanceSummaryCard creditAccountSummaryArray={creditAccountSummaryArray}/>
                <DetailsCard expenseArray={expenseArray} getAccountNameById={props.getAccountNameById}
                             updateExpense={setExpenseArray} accountsArray={props.accountsArray}/>
            </div>
        </div>
    );
}