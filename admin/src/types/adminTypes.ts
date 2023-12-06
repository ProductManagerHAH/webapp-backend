

export interface IAdmin {
    id: string,
    date: Date,
    firstName: string,
    lastName: string,
    picRef: string,
    email: string,
    password: string,
    phoneNumber: string,
    accessLevel: number [],
    deleted: boolean,
}

