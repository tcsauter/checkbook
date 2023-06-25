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
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [accountsError, setAccountsError] = useState(false);
    const [accountsErrorString, setAccountsErrorString] = useState("");
    const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriodModel[] | undefined>(undefined);
    const [budgetPeriodsLoading, setBudgetPeriodsLoading] = useState(true);
    const [budgetPeriodsError, setBudgetPeriodsError] = useState(false);
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriodModel | undefined>(undefined);

    useEffect(() => {
        setAccountsLoading(true);
        setBudgetPeriodsLoading(true);
        getAccounts()
            .then(accounts => {
                setAccounts(accounts);
                setAccountsLoading(false);
            })
            .catch(reason => {
                setAccountsError(true);
                setAccountsErrorString(reason.toString());
            });

        getBudgetPeriods()
            .then(budgetPeriods => {
                setBudgetPeriods(budgetPeriods);
                setBudgetPeriod(findCurrentBudgetPeriod(budgetPeriods));
                setBudgetPeriodsLoading(false);
            })
            .catch(() => {
                setBudgetPeriodsError(true);
                setBudgetPeriodsLoading(false);
            });
    }, [])

    function getAccountNameById(id: string): string | undefined {
        return accounts.find(element => element.id === id)?.name;
    }

    function findCurrentBudgetPeriod(bps: BudgetPeriodModel[]) {
        const date = new Date();
        const dateString = date.getFullYear().toString() + "-" +
            (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
            date.getDate().toString().padStart(2, "0");

        return bps.find(bp => dateString >= bp.budgetStart && dateString <= bp.budgetEnd);
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
                    budgetPeriodsError={budgetPeriodsError} currBudgetPeriod={budgetPeriod}/>
            <HomePage getAccountNameById={getAccountNameById}
                      accountsArray={accounts}
                      budgetPeriod={budgetPeriod}
                      updateBudgetPeriod={updateBudgetPeriod}
                      accountsLoading={accountsLoading}
                      budgetPeriodsLoading={budgetPeriodsLoading}
            />
        </div>
    );
}

export default App;
