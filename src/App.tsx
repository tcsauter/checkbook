import React, {useState} from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import _accounts from "./resources/data/accounts.json";

function App() {
    const [accounts, setAccounts] = useState<AccountModel[]>(_accounts as AccountModel[]);

    function getAccountNameById(id: string): string | undefined {
        return accounts.find(element => element.id === id)?.name;
    }

    return (
        <div className="App">
            <Navbar/>
            <HomePage getAccountNameById={getAccountNameById}
                      accountsArray={accounts}
            />
        </div>
    );
}

export default App;
