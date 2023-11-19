/* eslint-disable prettier/prettier */


/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";


export class CreateDoctorTable1637586256789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'doctor',
                columns: [
                    {
                        name: 'userId',
                        type: 'int', // or 'integer' depending on your database
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment', // This is for auto-increment
                        isNullable: false,
                    },
                    // Add any additional columns specific to the Doctor entity
                    {
                        name: 'specialization',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'doctor',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctor');
    }
}
