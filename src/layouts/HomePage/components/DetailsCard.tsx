import React, {useState} from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

export const DetailsCard: React.FC<{
    expenseArray: ExpenseModel[],
    accountsArray: AccountModel[],
    getAccountNameById: (id: number) => string | undefined,
    updateExpense: React.Dispatch<React.SetStateAction<ExpenseModel[]>>
}> = (props) => {
    const [acctFilter, setAcctFilter] = useState('');

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
                    <input className='form-control' list='detailsAccounts' placeholder='Filter by Account'
                           onInput={event => setAcctFilter(event.currentTarget.value)}
                    />
                    <datalist id='detailsAccounts'>
                        <option value='All Credit Accounts' />
                        <option value='All Cash Accounts' />
                        {props.accountsArray.map(account => <option value={account.name} key={account.name}/>)}
                    </datalist>
                </div>
                <ul className='list-group'>
                    {props.expenseArray.filter((expense: ExpenseModel) => {
                        if (acctFilter !== '') {
                            //get acct object for expense
                            const acct = props.accountsArray[props.accountsArray.findIndex(acct => acct.id === expense.accountId)];

                            if(acctFilter === 'All Credit Accounts') {
                                return acct.type === 'Credit';
                            }else if(acctFilter === 'All Cash Accounts') {
                                return acct.type === 'Cash';
                            }else {
                                return acctFilter === acct.name;
                            }
                        } else {
                            return true;
                        }
                    })
                        .map((expense: ExpenseModel) => {
                            return (<ExpenseListItem expense={expense}
                                                     updateExpense={updateExpenseArray}
                                                     acctName={props.getAccountNameById(expense.accountId)}
                                                     key={expense.id}
                            />);
                        })}
                </ul>
            </div>
        </div>
    );
}