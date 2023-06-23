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
    const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriodModel[] | undefined>(undefined);
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriodModel | undefined>(undefined);

    useEffect(() => {
        getAccounts().then(response => setAccounts(response)).catch(reason => console.log(reason));
        getBudgetPeriods().then(response => setBudgetPeriods(response)).catch(reason => console.log(reason));
    }, [])

    function getAccountNameById(id: string): string | undefined {
        return accounts.find(element => element.id === id)?.name;
    }

    return (
        <div className="App">
            <Navbar budgetPeriodsArray={budgetPeriods} setBudgetPeriod={setBudgetPeriod}
                    currBudgetPeriod={budgetPeriod}/>
            <HomePage getAccountNameById={getAccountNameById}
                      accountsArray={accounts}
                      budgetPeriod={budgetPeriod}
                      updateBudgetPeriod={updateBudgetPeriod}
            />
        </div>
    );
}

export default App;
