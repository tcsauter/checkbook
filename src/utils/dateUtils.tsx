export function stringifyDate(date: Date): string {
    return date.getUTCFullYear().toString() + "-" +
        (date.getUTCMonth() + 1).toString().padStart(2, "0") + "-" +
        date.getUTCDate().toString().padStart(2, "0");
}

export function calculateDateReturnString(startDate: Date, offsetDays: number): string{
    startDate.setUTCDate(startDate.getUTCDate() + offsetDays)
    return stringifyDate(startDate)
}

export function setInitialDateValue(): string {
    return stringifyDate(new Date());
}

export interface Month {
    name: string;
    num: number;
    days: number;
}

export function getMonthArray(): Month[] {
    return [
        {name: "January", num: 1, days: 31},
        {name: "February", num: 2, days: 28},
        {name: "March", num: 3, days: 31},
        {name: "April", num: 4, days: 30},
        {name: "May", num: 5, days: 31},
        {name: "June", num: 6, days: 30},
        {name: "July", num: 7, days: 31},
        {name: "August", num: 8, days: 31},
        {name: "September", num: 9, days: 30},
        {name: "October", num: 10, days: 31},
        {name: "November", num: 11, days: 30},
        {name: "December", num: 12, days: 31}
    ]
}