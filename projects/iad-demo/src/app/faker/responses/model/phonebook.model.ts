export class PhoneBook {
    public id: number;
    public nameField?: string;
    public surnameField?: string;
    public birthDate?: string;
    public phone?: string;
    public email?: string;
    public firstField?: string[];
    public secondField?: string;
    public booleanField?: boolean;
    public dropdownField?: string;
    public dropdownFieldDynamic?: string;
    public htmlField?: string;
    public chipsField?: string[];

    private names = [
        'Иван',
        'Пётр',
        'Александр',
        'Лариса',
        'Елена',
        'Полуэкт'
    ];

    private surNames = [
        'Иванов',
        'Пётрова',
        'Смирнов',
        'Киселёв',
        'Калинина',
        'Горький'
    ];

    constructor(
        id: number,
        nameField?: string,
        surnameField?: string,
        birthDate?: string,
        phone?: string,
        email?: string,
        firstField?: string[],
        secondField?: string,
        booleanField?: boolean,
        dropdownField?: string,
        dropdownFieldDynamic?: string,
        htmlField?: string,
        chipsField?: string[]
    ) {
        this.id = id;
        this.surnameField = surnameField || this.randomizer(this.surNames);
        this.nameField = nameField || this.randomizer(this.names);
        this.birthDate = birthDate || this.randomDate(new Date(1968, 0, 1), new Date(2000, 11, 31)).toISOString();
        this.phone = phone || this.randomPhone();
        this.email = email || this.randomMail();
    }

    clone() {
        return new PhoneBook(
            this.id,
            this.nameField,
            this.surnameField,
            this.birthDate,
            this.phone,
            this.email);
    }

    private randomizer(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    private randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private randomMail() {
        return Math.random().toString(36).substring(2, 15) + '@example.com';
    }

    private randomPhone() {
        return '+7 (' + this.randomNumber(100, 999) + ') ' + this.randomNumber(100, 999) + '-' + this.randomNumber(10, 99) + '-' + this.randomNumber(10, 99);
    }

    private randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
