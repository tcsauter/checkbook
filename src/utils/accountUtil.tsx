import AccountModel from "../models/AccountModel";

const baseUri = "http://localhost:8080";
const GET = "/get/accounts";
const POST = "/add/account"
const PUT = "/update/account"
const DELETE = "/delete/account"

//helper functions
export function getAccountNameById(accounts: AccountModel[], id: string): string | undefined {
    return accounts.find(element => element.id === id)?.name;
}


//data functions
export async function getAccounts() {
    const accounts: AccountModel[] = [];
    await fetch(`${baseUri}${GET}`)
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

    return accounts;
}

export async function addAccount(account: AccountModel) {
    const accounts: AccountModel[] = [];
    fetch (`${baseUri}${POST}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: account.id,
            name: account.name,
            type: account.type,
            lastFour: account.lastFour
        })
    }).then(async (response) => {
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

    return accounts;
}

export async function updateAccount(account: AccountModel) {
    const accounts: AccountModel[] = [];
    fetch (`${baseUri}${PUT}/${account.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: account.id,
            name: account.name,
            type: account.type,
            lastFour: account.lastFour
        })
    }).then(async (response) => {
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

    return accounts;
}

export async function deleteAccount(acctId: string) {
    const accounts: AccountModel[] = [];
    fetch (`${baseUri}${DELETE}/${acctId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
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

    return accounts;
}