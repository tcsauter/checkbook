import React from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

export const DetailsCard: React.FC<{
    expenseArray: ExpenseModel[],
    accountsArray: AccountModel[],
    getAccountNameById: (id: number) => string | undefined,
    updateExpense: React.Dispatch<React.SetStateAction<ExpenseModel[]>>
}> = (props) => {

    function updateExpenseArray(newExpense: ExpenseModel) {
        const newExpenseArray = Array.from(props.expenseArray);
        newExpenseArray.splice(
            newExpenseArray.findIndex(value => value.id === newExpense.id),
            1,
            newExpense
        );
        props.updateExpense(newExpenseArray);
    }

    return (
        <div className='card bg-light text-muted shadow' id='details-card'>
            <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                <div className='p-3 row justify-content-center'>
                    <input className='form-control' list='detailsAccounts' placeholder='Filter by Account' />
                    <datalist id='detailsAccounts' >
                        {props.accountsArray.map(account => <option value={account.name} key={account.name} />)}
                    </datalist>
                </div>
                <ul className='list-group'>
                    {props.expenseArray.map((value: ExpenseModel) => {
                        return (<ExpenseListItem expense={value}
                                                 updateExpense={updateExpenseArray}
                                                 acctName={props.getAccountNameById(value.id)}
                                                 key={value.id}
                        />);
                    })}
                </ul>
            </div>
        </div>
    );
}