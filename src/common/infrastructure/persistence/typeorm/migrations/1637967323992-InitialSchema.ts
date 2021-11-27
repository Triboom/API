import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637967323992 implements MigrationInterface {
    name = 'InitialSchema1637967323992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deliveries\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`sale_id\` bigint UNSIGNED NOT NULL, \`address\` varchar(150) NOT NULL, \`district\` varchar(6) NOT NULL, \`estimated_delivery_date\` date NOT NULL, \`delivery_date\` date NOT NULL, \`delivery_status\` tinyint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`discounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`discount\` decimal NULL, \`sale_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(75) NOT NULL, \`ammount\` int NOT NULL, \`currency\` varchar(75) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`orderQuantity\` int NOT NULL, \`orderStatus\` tinyint NOT NULL, \`ammount\` int NOT NULL, \`currency\` varchar(75) NOT NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`product_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sales\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`discounts\``);
        await queryRunner.query(`DROP TABLE \`deliveries\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
