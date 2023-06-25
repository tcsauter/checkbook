import BudgetPeriodModel from "../models/BudgetPeriodModel";

const baseUri = "http://localhost:8080";
const GET = "/get/budgetperiods";
const PUT = "/update/budgetperiod/"

export async function getBudgetPeriods() {
    const budgetPeriods: BudgetPeriodModel[] = [];
    await fetch(`${baseUri}${GET}`)
        .then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json();

            for (const key in responseJson) {
                budgetPeriods.push({
                    id: responseJson[key]._id,
                    payDate: responseJson[key].payDate,
                    budgetStart: responseJson[key].budgetStart,
                    budgetEnd: responseJson[key].budgetEnd,
                    startingAmt: responseJson[key].startingAmt
                })
            }
        })

    return budgetPeriods;
}

export async function updateBudgetPeriod(bp: BudgetPeriodModel): Promise<BudgetPeriodModel[]> {
    const budgetPeriods: BudgetPeriodModel[] = []
    await fetch(`${baseUri}${PUT}${bp.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            _id: bp.id,
            payDate: bp.payDate,
            budgetStart: bp.budgetStart,
            budgetEnd: bp.budgetEnd,
            startingAmt: bp.startingAmt
        })
    })
        .then(async response => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            const responseJson = await response.json();

            for (const key in responseJson) {
                budgetPeriods.push({
                    id: responseJson[key]._id,
                    payDate: responseJson[key].payDate,
                    budgetStart: responseJson[key].budgetStart,
                    budgetEnd: responseJson[key].budgetEnd,
                    startingAmt: responseJson[key].startingAmt
                });
            }
        })

    return budgetPeriods;
}