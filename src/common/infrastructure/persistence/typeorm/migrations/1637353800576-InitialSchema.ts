import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637353800576 implements MigrationInterface {
    name = 'InitialSchema1637353800576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`ammount\` int NOT NULL, \`currency\` varchar(75) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`orderQuantity\` int NOT NULL, \`dateTime\` date NOT NULL, \`orderStatus\` tinyint NOT NULL, \`ammount\` int NOT NULL, \`currency\` varchar(75) NOT NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`product_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sales\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
