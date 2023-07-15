import AccountModel from "../models/AccountModel";

const baseUri = "http://localhost:8080";
const GET = "/get/accounts";

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