import { Column } from "typeorm";

export class AddressTypeorm{
  @Column('varchar', {name: 'address', length: 150, nullable: false})
  public address: string;

  @Column('varchar', {name: 'district', length:6, nullable: false})
  public district: string;

  private constructor(address: string, district: string) {
    this.address = address;
    this.district = district;
  }

  public static from(address: string, district: string): AddressTypeorm{
    return new AddressTypeorm(address, district);
  }
}