class AccountModel {
    id: string;
    name: string;
    type: "Credit" | "Cash";
    lastFour?: string;

    constructor (id: string,
                 name: string,
                 type: "Credit" | "Cash",
                 lastFour?: string
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