export class Faker {

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

    randomizer(myArray): string {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    randomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    randomMail(): string {
        return Math.random().toString(36).substring(2, 15) + '@example.com';
    }

    randomPhone(): string {
        return '+7 (' + this.randomNumber(100, 999) + ') ' + this.randomNumber(100, 999) + '-' + this.randomNumber(10, 99) + '-' + this.randomNumber(10, 99);
    }

    randomNumber(min, max): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    randomName(): string {
        return this.randomizer(this.names);
    }

    randomSurname(): string {
        return this.randomizer(this.surNames);
    }

    randomDateBetweenYears(year1: number, year2: number): string {
        return this.randomDate(new Date(year1, 0, 1), new Date(year2, 11, 31)).toISOString();
    }
}
