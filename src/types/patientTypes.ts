

export interface IPatient    {
    id: string,
    date: Date,
    firstName: string,
    lastName: string,
    dob: Date,
    picRef: string,
    email: string,
    phoneNumber: string,
    password: string,
    associatedAccId:string,
    associatedRelation:string,
    deleted: boolean,
}

