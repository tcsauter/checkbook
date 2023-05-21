import React, {useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";
import {CreditBalanceSummaryCardProps} from "../../models/props";
import {AddNewExpenseCard} from "./components/AddNewExpenseCard";
import AccountModel from "../../models/AccountModel";

export const HomePage: React.FC<{
    expensesArray: ExpenseModel[],
    updateExpense: React.Dispatch<React.SetStateAction<ExpenseModel[]>>,
    getAccountNameById: (id: number) => string | undefined,
    creditAccountSummaryArray: CreditBalanceSummaryCardProps[],
    accountsArray: AccountModel[]
}> = (props) => {
    const [remainCardInitAmt, setRemainCardInitAmt] = useState(0);

    function calculateSpent(): number {
        let totalAmount: number = 0;
        props.expensesArray.map(value => totalAmount += value.amount);
        return totalAmount;
    }

    function addNewExpense(newExpense:ExpenseModel) {
        //set id of new expense
        newExpense.id = props.expensesArray[props.expensesArray.length - 1].id + 1;

        const newArray = props.expensesArray.slice();
        newArray.push(newExpense);
        props.updateExpense(newArray);
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
                    <CreditBalanceSummaryCard creditAccountSummaryArray={props.creditAccountSummaryArray}/>
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard expenseArray={props.expensesArray} getAccountNameById={props.getAccountNameById}
                                 updateExpense={props.updateExpense} accountsArray={props.accountsArray}/>
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
                <CreditBalanceSummaryCard creditAccountSummaryArray={props.creditAccountSummaryArray}/>
                <DetailsCard expenseArray={props.expensesArray} getAccountNameById={props.getAccountNameById}
                             updateExpense={props.updateExpense} accountsArray={props.accountsArray}/>
            </div>
        </div>
    );
}