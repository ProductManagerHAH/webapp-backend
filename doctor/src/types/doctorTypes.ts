

export interface IDoctor    {
    id: string,
    date: Date,
    firstName: string,
    lastName: string,
    gender:string,
    dob: Date,
    picRef: string,
    email: string,
    phoneNumber: string,
    password: string,
    specialty:number[],
    deleted: boolean,
}

