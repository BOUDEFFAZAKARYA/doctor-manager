/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ietialshema20221116124500 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing primary key constraint
    await queryRunner.query('ALTER TABLE `user` DROP PRIMARY KEY');

    // Modify the data type of the id column
    await queryRunner.query('ALTER TABLE `user` MODIFY COLUMN `id` INT');

    // Recreate the primary key constraint
    await queryRunner.query('ALTER TABLE `user` ADD PRIMARY KEY (`id`)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the changes made in the up method if needed
    await queryRunner.query('ALTER TABLE `user` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `user` MODIFY COLUMN `id` UUID');
    await queryRunner.query('ALTER TABLE `user` ADD PRIMARY KEY (`id`)');
  }

}
