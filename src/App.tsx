import React, {useEffect, useState} from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";

function App() {
    const [accounts, setAccounts] = useState<AccountModel[]>([]);

    useEffect(() => {
        async function getAccounts() {
            const accounts: AccountModel[] = [];
            await fetch("http://192.168.1.135:8080/get/accounts")
                .then(async response => {
                    if(!response.ok){
                        console.log(response.statusText);
                    }

                    const responseJson = await response.json();

                    for(const key in responseJson){
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
    }, [])

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
