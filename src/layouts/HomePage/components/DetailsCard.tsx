import React, {useState} from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

const baseUri = "http://localhost:8080";

export const DetailsCard: React.FC<{
    expenseArray: ExpenseModel[],
    accountsArray: AccountModel[],
    getAccountNameById: (id: string) => string | undefined,
    updateExpense: (expense: ExpenseModel) => Promise<void>,
    deleteExpense: (expenseId: string) => Promise<void>
}> = (props) => {
    const [acctFilter, setAcctFilter] = useState('');
    const [clearBtnClickedOnce, setClearBtnClickedOnce] = useState(false);

    async function clearExpenses(){
        //todo: move this to HomePage and pass down to DetailsCard
        setClearBtnClickedOnce(false);

        await fetch(baseUri + "/clear/expenses")
            .then(async response => {
                if(!response.ok){
                    console.log(response.statusText);
                }

                const responseJson: boolean = await response.json();

                if(responseJson){

                }
            })
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
                        <option value='All Credit Accounts'/>
                        <option value='All Cash Accounts'/>
                        {props.accountsArray.map(account => <option value={account.name} key={account.name}/>)}
                    </datalist>
                </div>
                <ul className='list-group'>
                    {props.expenseArray.filter((expense: ExpenseModel) => {
                        if (acctFilter !== '') {
                            //get acct object for expense
                            const acct = props.accountsArray[props.accountsArray.findIndex(acct => acct.id === expense.accountId)];

                            if (acctFilter === 'All Credit Accounts') {
                                return acct.type === 'Credit';
                            } else if (acctFilter === 'All Cash Accounts') {
                                return acct.type === 'Cash';
                            } else {
                                return acctFilter === acct.name;
                            }
                        } else {
                            return true;
                        }
                    })
                        .map((expense: ExpenseModel) => {
                            return (<ExpenseListItem expense={expense}
                                                     updateExpense={props.updateExpense}
                                                     deleteExpense={props.deleteExpense}
                                                     acctName={props.getAccountNameById(expense.accountId)}
                                                     key={expense.id}
                            />);
                        })}
                </ul>
                <input type="button"
                       value={clearBtnClickedOnce ? "Confirm Clear" : "Clear Expenses"}
                       className={clearBtnClickedOnce ? "btn btn-danger mt-3" : "btn btn-outline-warning mt-3"}
                       onClick={() => {
                           if(clearBtnClickedOnce) {
                               clearExpenses();
                           }else{
                               setClearBtnClickedOnce(true);
                           }
                       }}
                />
            </div>
        </div>
    );
}