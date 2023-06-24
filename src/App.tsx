import React, {useEffect, useState} from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import BudgetPeriodModel from "./models/BudgetPeriodModel";
import {getBudgetPeriods, updateBudgetPeriod} from "./utils/budgetPeriodUtil";
import {getAccounts} from "./utils/accountUtil";

function App() {
    const [accounts, setAccounts] = useState<AccountModel[]>([]);
    const [accountsLoading, setAccountsLoading] = useState(false);
    const [accountsError, setAccountsError] = useState(false);
    const [accountsErrorString, setAccountsErrorString] = useState("");
    const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriodModel[] | undefined>(undefined);
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriodModel | undefined>(undefined);

    useEffect(() => {
        setAccountsLoading(true);
        getAccounts()
            .then(accounts => {
                setAccounts(accounts);
                setAccountsLoading(false);
            })
            .catch(reason => {
                setAccountsError(true);
                setAccountsErrorString(reason.toString());
            });

        getBudgetPeriods().then(response => setBudgetPeriods(response)).catch(reason => console.log(reason));
    }, [])

    function getAccountNameById(id: string): string | undefined {
        return accounts.find(element => element.id === id)?.name;
    }

    if(accountsError){
        return(
            <div className="card">
                <h1 className="card-header">!Error!</h1>
                <p className="card-body">{accountsErrorString}</p>
            </div>
        );
    }

    return (
        <div className="App">
            <Navbar budgetPeriodsArray={budgetPeriods} setBudgetPeriod={setBudgetPeriod}
                    currBudgetPeriod={budgetPeriod}/>
            <HomePage getAccountNameById={getAccountNameById}
                      accountsArray={accounts}
                      budgetPeriod={budgetPeriod}
                      updateBudgetPeriod={updateBudgetPeriod}
                      accountsLoading={accountsLoading}
            />
        </div>
    );
}

export default App;
