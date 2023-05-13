import React, {useState} from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";
import ExpenseModel from "../../models/ExpenseModel";

export const HomePage: React.FC<{
    expenseArray: ExpenseModel[],
    updateExpense: React.Dispatch<React.SetStateAction<ExpenseModel[]>>,
    getAccountNameById: (id: number) => string | undefined
}> = (props) => {
    const [remainCardInitAmt, setRemainCardInitAmt] = useState(0);

    console.log("homepage is rendered");

    return (
        <div className='container bg-black vh-100 bg-opacity-75'>
            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3 mt-3'>
                    <RemainCard
                        input={{
                            initialAmount: remainCardInitAmt ? remainCardInitAmt : 550,
                            setInitAmt: setRemainCardInitAmt
                        }}
                    />
                    <CreditBalanceSummaryCard name={"Travis Sauter-Hunsberger"}/>
                </div>
                <div className='w-75 mt-3'>
                    <DetailsCard expenseArray={props.expenseArray} getAccountNameById={props.getAccountNameById} updateExpense={props.updateExpense} />
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                <RemainCard
                    input={{
                        initialAmount: remainCardInitAmt ? remainCardInitAmt : 550,
                        setInitAmt: setRemainCardInitAmt
                    }}
                />
                <CreditBalanceSummaryCard name={"Travis Sauter-Hunsberger"}/>
                <DetailsCard expenseArray={props.expenseArray} getAccountNameById={props.getAccountNameById} updateExpense={props.updateExpense} />
            </div>
        </div>
    );
}