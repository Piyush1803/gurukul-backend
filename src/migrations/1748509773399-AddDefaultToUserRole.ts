import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultToUserRole1748509773399 implements MigrationInterface {
    name = 'AddDefaultToUserRole1748509773399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL`);
    }

}
