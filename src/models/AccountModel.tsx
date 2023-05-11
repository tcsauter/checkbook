class AccountModel {
    id: number;
    name: string;
    type: "Credit" | "Cash";
    lastFour?: number;

    constructor (id: number,
                 name: string,
                 type: "Credit" | "Cash",
                 lastFour?: number
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.lastFour = lastFour ? lastFour : undefined;
    }
}

// interface AccountModel {
//     id: number,
//     name: string,
//     type: string,
//     lastFour?: number;
// }

export default AccountModel;