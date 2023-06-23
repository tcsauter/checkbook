import React, {useEffect, useState} from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import BudgetPeriodModel from "./models/BudgetPeriodModel";
import {getBudgetPeriods, updateBudgetPeriod} from "./utils/budgetPeriodUtil";

const baseUri = "http://localhost:8080"

function App() {
    const [accounts, setAccounts] = useState<AccountModel[]>([]);
    const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriodModel[] | undefined>(undefined);
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriodModel | undefined>(undefined);

    useEffect(() => {
        async function getAccounts() {
            const accounts: AccountModel[] = [];
            await fetch(baseUri + "/get/accounts")
                .then(async response => {
                    if (!response.ok) {
                        console.log(response.statusText);
                    }

                    const responseJson = await response.json();

                    for (const key in responseJson) {
                        accounts.push({
                            id: responseJson[key]._id,
                            name: responseJson[key].name,
                            type: responseJson[key].type,
                            lastFour: responseJson[key].lastFour
                        })
                    }
                })
                .catch(reason => console.log(reason))

            return accounts;
        }

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
