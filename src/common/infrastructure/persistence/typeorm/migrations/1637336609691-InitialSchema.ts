import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637336609691 implements MigrationInterface {
    name = 'InitialSchema1637336609691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` int NOT NULL, \`dateTime\` date NOT NULL, \`orderStatus\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sales\``);
    }

}
