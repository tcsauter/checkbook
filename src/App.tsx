import React, {useEffect, useState} from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import ExpenseModel from "./models/ExpenseModel";
import _accounts from "./resources/data/accounts.json";
import _expenses from "./resources/data/expenses.json";

function App() {
    const [accounts, setAccounts] = useState<AccountModel[]>(_accounts as AccountModel[]);
    const [expenses, setExpenses] = useState<ExpenseModel[]>([]);



    return (
        <div className="App">
            <Navbar/>
            <HomePage name={"Travis"}/>
        </div>
    );
}

export default App;
