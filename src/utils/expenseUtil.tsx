import ExpenseModel from "../models/ExpenseModel";

const baseUri = "http://localhost:8080";
const GET = "/get/expenses";
const POST = "/add/expense";
const PUT = "/update/expense/";
const DELETE = "/delete/expense/";
const CLEAR = "/clear/expenses";

export const getExpenses = async (dateParams: string) => {
    const expenses: ExpenseModel[] = []
    await fetch(`${baseUri}${GET}${dateParams}`)
        .then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json();

            for (const key in responseJson) {
                expenses.push({
                    id: responseJson[key]._id,
                    amount: responseJson[key].amount,
                    accountId: responseJson[key].accountId,
                    date: responseJson[key].date
                });
            }
        })
        .catch(reason => console.log(reason))

    return expenses;
}

export async function addNewExpense(newExpense: ExpenseModel, dateParams: string) {
    const newArray: ExpenseModel[] = [];
    await fetch(`${baseUri}${POST}${dateParams}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "_id": newExpense.id,
            "amount": newExpense.amount,
            "accountId": newExpense.accountId,
            "date": newExpense.date
        })
    })
        .then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json();

            for (const key in responseJson) {
                newArray.push({
                    id: responseJson[key]._id,
                    amount: responseJson[key].amount,
                    accountId: responseJson[key].accountId,
                    date: responseJson[key].date
                });
            }
        })
        .catch(reason => console.log(reason));

    return newArray;
}

export async function expenseUpdate(expense: ExpenseModel, dateParams: string){
    const newArray: ExpenseModel[] = [];
    await fetch(`${baseUri}${PUT}${expense.id}${dateParams}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "_id": expense.id,
            "accountId": expense.accountId,
            "amount": expense.amount,
            "date": expense.date
        })
    }).then(async response => {
        if (!response.ok) {
            console.log(response.statusText);
        }

        const responseJson = await response.json();

        for (const key in responseJson) {
            newArray.push({
                id: responseJson[key]._id,
                accountId: responseJson[key].accountId,
                amount: responseJson[key].amount,
                date: responseJson[key].date
            })
        }
    })

    return newArray;
}

export async function expenseDelete(expenseId: string, dateParams: string){
    const newArray: ExpenseModel[] = [];
    await fetch(`${baseUri}${DELETE}${expenseId}${dateParams}` , {
        method: "DELETE"
    }).then(async response => {
        if (!response.ok) {
            console.log(response.statusText);
        }

        const responseJson = await response.json();

        for (const key in responseJson) {
            newArray.push({
                id: responseJson[key]._id,
                accountId: responseJson[key].accountId,
                amount: responseJson[key].amount,
                date: responseJson[key].date
            })
        }
    })

    return newArray;
}

export async function expensesClear(){
    let result: boolean = false;

    await fetch(`${baseUri}${CLEAR}`, {
        method: "DELETE"
    })
        .then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            result = await response.json();
        })

    return result;
}