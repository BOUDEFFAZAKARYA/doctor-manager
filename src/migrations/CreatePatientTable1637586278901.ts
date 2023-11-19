/* eslint-disable prettier/prettier */


/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";



export class CreatePatientTable1637586278901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'patient',
                columns: [
                    {
                        name: 'userId',
                        type: 'int', // or 'integer' depending on your database
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment', // This is for auto-increment
                        isNullable: false,
                    
                    },
                    // Add any additional columns specific to the Patient entity
                    {
                        name: 'dob',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'patient',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patient');
    }
}
