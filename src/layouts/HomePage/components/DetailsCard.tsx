import React from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import ExpenseModel from "../../../models/ExpenseModel";

export const DetailsCard: React.FC<{
    expenseArray: ExpenseModel[],
    getAccountNameById: (id: number) => string | undefined,
    updateExpense: (id: number, field: string, value: string) => void
}> = (props) => {

    return (
        <div className='card bg-light text-muted shadow' id='details-card'>
            <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                <ul className='list-group'>
                    {/*<ExpenseListItem input={{*/}
                    {/*    amount: 145.36,*/}
                    {/*    date: {*/}
                    {/*        month: 4,*/}
                    {/*        day: 30,*/}
                    {/*        year: 2023*/}
                    {/*    },*/}
                    {/*    account: "Citi"*/}
                    {/*}}/>*/}
                    {/*<ExpenseListItem input={{*/}
                    {/*    amount: 4.35,*/}
                    {/*    date: {*/}
                    {/*        month: 4,*/}
                    {/*        day: 30,*/}
                    {/*        year: 2023*/}
                    {/*    },*/}
                    {/*    account: "Bank of America"*/}
                    {/*}}/>*/}

                    {props.expenseArray.map((value: ExpenseModel) => {
                        return (<ExpenseListItem amount={value.amount}
                                                 acctName={props.getAccountNameById(value.accountId)}
                                                 date={value.date}
                                                 updateExpense={props.updateExpense}
                                                 key={value.id}
                        />);
                    })}
                </ul>
            </div>
        </div>
    );
}