export class PhoneBook {
    constructor(
        public id: number,
        public nameField?: string,
        public surnameField?: string,
        public birthDate?: string,
        public phone?: string,
        public email?: string,
        public firstField?: string[],
        public secondField?: string,
        public booleanField?: boolean,
        public dropdownField?: string,
        public dropdownFieldDynamic?: string,
        public htmlField?: string,
        public chipsField?: string[],
        public socialNetwork1?: string,
        public socialNetwork2?: string
    ) {}

    clone(): PhoneBook {
        return new PhoneBook(
            this.id,
            this.nameField,
            this.surnameField,
            this.birthDate,
            this.phone,
            this.email,
            this.firstField,
            this.secondField,
            this.booleanField,
            this.dropdownField,
            this.dropdownFieldDynamic,
            this.htmlField,
            this.chipsField,
            this.socialNetwork1,
            this.socialNetwork2
        );
    }
}
