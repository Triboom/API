export class RegisterProductCommand{
    constructor(
        public readonly name: string,
        public readonly price: string,
    ){}
}