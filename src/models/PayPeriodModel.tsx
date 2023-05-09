class PayPeriodModel{
    id: number;
    start: Date;
    end: Date;
    softStart?: Date;
    softEnd?: Date;

    constructor(
        id: number,
        start: Date,
        end: Date,
        softStart?: Date,
        softEnd?: Date
    ) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.softStart = softStart ? softStart : undefined;
        this.softEnd = softEnd ? softEnd : undefined;
    }
}

export default PayPeriodModel;