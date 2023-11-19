/* eslint-disable prettier/prettier */



/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";


export class CreatePrescriptionTable1637586291234 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'prescription',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isGenerated: true,
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: 'increment',
                    },
                    // Add any additional columns specific to the Prescription entity
                    {
                        name: 'medication',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'dosage',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'frequency',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'startDate',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'endDate',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'patientUserId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'doctorUserId',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'prescription',
            new TableForeignKey({
                columnNames: ['patientUserId'],
                referencedColumnNames: ['userId'],
                referencedTableName: 'patient',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'prescription',
            new TableForeignKey({
                columnNames: ['doctorUserId'],
                referencedColumnNames: ['userId'],
                referencedTableName: 'doctor',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('prescription');
    }
}
