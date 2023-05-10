class AccountModel {
    id: number;
    name: string;
    type: string;
    lastFour?: number;

    constructor (id: number,
                 name: string,
                 type: string,
                 lastFour?: number
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.lastFour = lastFour ? lastFour : undefined;
    }
}

export default AccountModel;