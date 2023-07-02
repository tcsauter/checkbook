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