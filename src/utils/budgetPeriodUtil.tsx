import BudgetPeriodModel from "../models/BudgetPeriodModel";
import {stringifyDate} from "./dateUtils";

const baseUri = "http://localhost:8080";
const GET = "/get/budgetperiods";
const POST = "/add/budgetperiod";
const POSTBULK = "/bulkadd/budgetperiods"
const PUT = "/update/budgetperiod/"

async function handleReturnedArrayOfBps(response: Response): Promise<BudgetPeriodModel[]> {
    const container: BudgetPeriodModel[] = [];
    if (!response.ok) {
        console.log(response.statusText);
    }

    const responseJson = await response.json();

    for (const key in responseJson) {
        container.push({
            id: responseJson[key]._id,
            payDate: responseJson[key].payDate,
            budgetStart: responseJson[key].budgetStart,
            budgetEnd: responseJson[key].budgetEnd,
            startingAmt: responseJson[key].startingAmt
        })
    }

    return container;
}

export function findCurrentBudgetPeriod(bps: BudgetPeriodModel[]) {
    const dateString = stringifyDate(new Date());

    return bps.find(bp => dateString >= bp.budgetStart && dateString <= bp.budgetEnd);
}

export function budgetPeriodStringify(bp: BudgetPeriodModel) {
    return (
        new Date(bp.budgetStart).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: undefined,
            month: "short",
            day: "numeric"
        }) +
        " to " +
        new Date(bp.budgetEnd).toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric"
        })
    );
}

export async function getBudgetPeriods(): Promise<BudgetPeriodModel[]> {
    return fetch(`${baseUri}${GET}`)
        .then(response => handleReturnedArrayOfBps(response));
}

export async function addBudgetPeriod(bp: BudgetPeriodModel): Promise<BudgetPeriodModel[]> {
    return fetch(`${baseUri}${POST}`, {
        method: "POST",
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
    }).then(response => handleReturnedArrayOfBps(response));
}

export async function addBudgetPeriodBatch(bpArray: BudgetPeriodModel[]): Promise<BudgetPeriodModel[]> {
    const objArray: object[] = [];
    for(let x = 0; x < bpArray.length; x++) {
        objArray.push({
            _id: bpArray[x].id,
            payDate: bpArray[x].payDate,
            budgetStart: bpArray[x].budgetStart,
            budgetEnd: bpArray[x].budgetEnd,
            startingAmt: bpArray[x].startingAmt
        })
    }

    return fetch(`${baseUri}${POSTBULK}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objArray)
    }).then(response => handleReturnedArrayOfBps(response));
}

export async function updateBudgetPeriod(bp: BudgetPeriodModel): Promise<BudgetPeriodModel[]> {
    return fetch(`${baseUri}${PUT}${bp.id}`, {
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
    }).then(response => handleReturnedArrayOfBps(response));
}