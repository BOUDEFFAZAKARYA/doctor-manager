/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAllTables1637587000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order to avoid foreign key constraints
        await queryRunner.dropTable('medical_history', true);
        await queryRunner.dropTable('prescription', true);
        await queryRunner.dropTable('patient', true);
        await queryRunner.dropTable('doctor', true);
        await queryRunner.dropTable('user', true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // You might want to add logic to recreate the tables if needed
    }
}
