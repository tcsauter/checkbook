class AccountModel {
    id: number;
    name: string;
    lastFour?: number;

    constructor (id: number,
                 name: string,
                 lastFour?: number
    ) {
        this.id = id;
        this.name = name;
        this.lastFour = lastFour ? lastFour : undefined;
    }
}

export default AccountModel;