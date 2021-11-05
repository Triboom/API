export class RegisterProductResponseDto {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly price: number,
  ) {}
}
