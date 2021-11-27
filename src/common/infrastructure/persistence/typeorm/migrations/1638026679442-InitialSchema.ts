import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1638026679442 implements MigrationInterface {
    name = 'InitialSchema1638026679442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`discount\` decimal NULL, \`sale_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`orderQuantity\` int NOT NULL, \`orderStatus\` tinyint NOT NULL, \`ammount\` int NOT NULL, \`currency\` varchar(75) NOT NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`product_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sales\``);
        await queryRunner.query(`DROP TABLE \`discounts\``);
    }

}
