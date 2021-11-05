import { Column } from "typeorm";

export class ProductNameTypeORM{
    @Column('varchar', { name: 'name', length: 75, nullable: false })
    public name: string;

    private constructor(name: string){
        this.name = name;
    }

    public static from(name: string): ProductNameTypeORM{
        return new ProductNameTypeORM(name);
    }

}