import ExpenseModel from "../models/ExpenseModel";

const baseUri = "http://localhost:8080";
const GET = "/get/expenses";
const POST = "/add/expense";
const PUT = "/update/expense/";
const DELETE = "/delete/expense/";
const CLEAR = "/clear/expenses";

async function handleReturnedArrayOfExpenses(response: Response): Promise<ExpenseModel[]> {
    const container: ExpenseModel[] = [];
    if (!response.ok) {
        console.log(response.statusText);
    }

    const responseJson = await response.json();

    for (const key in responseJson) {
        container.push({
            id: responseJson[key]._id,
            amount: responseJson[key].amount,
            accountId: responseJson[key].accountId,
            date: responseJson[key].date
        });
    }

    return container;
}

export async function getExpenses(dateParams: string) {
    return fetch(`${baseUri}${GET}${dateParams}`)
        .then(response => handleReturnedArrayOfExpenses(response));
}

export async function addNewExpense(newExpense: ExpenseModel, dateParams: string) {
    return fetch(`${baseUri}${POST}${dateParams}`, {
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
        .then(response => handleReturnedArrayOfExpenses(response))
}

export async function expenseUpdate(expense: ExpenseModel, dateParams: string){
    return fetch(`${baseUri}${PUT}${expense.id}${dateParams}`, {
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
    }).then(response => handleReturnedArrayOfExpenses(response));
}

export async function expenseDelete(expenseId: string, dateParams: string){
    return fetch(`${baseUri}${DELETE}${expenseId}${dateParams}` , {
        method: "DELETE"
    }).then(response => handleReturnedArrayOfExpenses(response))
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