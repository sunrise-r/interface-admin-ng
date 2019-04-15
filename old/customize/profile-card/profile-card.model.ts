export class ProfileCardModel {
    constructor(
        public code: string,
        public label: string,
        public value: string,
        public translateLabel?: boolean,
        public translateValue?: boolean
    ) {}
}
