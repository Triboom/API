export class ProductRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
    public readonly price: string,
  ) {}
}