export class PhoneBook {
  constructor(
    public id: number,
    public nameField: string,
    public surnameField: string,
    public birthDate: string,
    public phone: string,
    public email: string,
    public firstField?: string,
    public secondField?: string,
    public booleanField?: boolean
  ) {}
}
