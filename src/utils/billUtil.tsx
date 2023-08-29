import BillModel from "../models/BillModel";

const baseUri = "http://localhost:8080";
const GET = "/get/bills";
const POST = "/add/bill";
const PUT = "/update/bill"
const DELETE = "/delete/bill"

async function handleReturnedArrayOfBills(response: Response): Promise<BillModel[]> {
    const container: BillModel[] = [];
    if (!response.ok) {
        console.log(response.statusText);
    }

    const responseJson = await response.json();

    for (const key in responseJson) {
        container.push({
            id: responseJson[key]._id,
            description: responseJson[key].description,
            amount: responseJson[key].amount,
            frequency: responseJson[key].frequency,
            due: responseJson[key].due,
            isPaidInInstallments: responseJson[key].paidInInstallments,
            paidSoFar: responseJson[key].paidSoFar,
            isPaidFromBudget: responseJson[key].paidFromBudget,
            comment: responseJson[key].comment
        });
    }

    return container;
}

function convertBillToDbObj(bill: BillModel) {
    return {
        "_id": bill.id,
        "description": bill.description,
        "amount": bill.amount,
        "frequency": bill.frequency,
        "due": bill.due,
        "paidInInstallments": bill.isPaidInInstallments,
        "paidSoFar": bill.paidSoFar,
        "paidFromBudget": bill.isPaidFromBudget,
        "comment": bill.comment
    }
}

export async function getBills() {
    return fetch(`${baseUri}${GET}`)
        .then(response => handleReturnedArrayOfBills(response));
}

export async function addBill(newBill: BillModel) {
    return fetch(`${baseUri}${POST}`, {
        method: "POST",
        headers: {
            "Content-Type:": "application/json"
        },
        body: JSON.stringify(convertBillToDbObj(newBill))
    })
        .then(response => handleReturnedArrayOfBills(response));
}

export async function updateBill(bill: BillModel) {
    return fetch(`${baseUri}${PUT}/${bill.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(convertBillToDbObj(bill))
    })
        .then(response => handleReturnedArrayOfBills(response));
}

export async function deleteBill(billId: string) {
    return fetch(`${baseUri}${DELETE}/${billId}`, {
        method: "DELETE"
    })
        .then(response => handleReturnedArrayOfBills(response));
}