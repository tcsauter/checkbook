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
    const [expenses, setExpenses] = useState<ExpenseModel[]>(_expenses as ExpenseModel[]);

    function getAccountNameById(id: number): string | undefined {
        return accounts.find(element => element.id === id)?.name;
    }

    function updateExpense(id: number, field: string, value: string): void {
        const localExpenses = expenses;
        const expenseIndex = expenses.findIndex(element => element.id === id);
        const expense = expenses.at(expenseIndex);
        //todo: make sure expenses array gets updated
        if (expense) {
            switch (field) {
                case "amount":
                    expense.amount = Number(value);
                    break;
                case "account":
                    expense.accountId = Number(value);
                    break;
                case "date":
                    expense.date = value;
                    break;
            }
            localExpenses.splice(expenseIndex, 1, expense);
            setExpenses(localExpenses);
        }
    }

    return (
        <div className="App">
            <Navbar/>
            <HomePage expenseArray={expenses} updateExpense={updateExpense} getAccountNameById={getAccountNameById} />
        </div>
    );
}

export default App;
