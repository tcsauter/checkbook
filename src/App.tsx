import React, {useState} from 'react';
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

    function calculateTotalSpentByAcct(): object[] {
        let creditBalanceSummaryArray: object[] = [];
        accounts.map((account) => {
            const expensesCopy: ExpenseModel[] = expenses.slice();
            let totalAmt: number = 0;
            expensesCopy.filter((expense) => expense.accountId === account.id)
                .map((expense) => totalAmt += expense.amount);
            creditBalanceSummaryArray.push({accountName: account.name, amount: totalAmt});
        });
        return creditBalanceSummaryArray;
    }

    return (
        <div className="App">
            <Navbar/>
            <HomePage expenseArray={expenses} updateExpense={setExpenses} getAccountNameById={getAccountNameById}/>
        </div>
    );
}

export default App;
