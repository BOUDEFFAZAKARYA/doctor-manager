/* eslint-disable prettier/prettier */


/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";




export class CreateMedicalHistoryTable1637586304567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'medical_history',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isGenerated: true,
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: 'increment',
                    },
                    // Add any additional columns specific to the MedicalHistory entity
                    {
                        name: 'diagnosis',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'treatment',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'notes',
                        type: 'text',
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
            'medical_history',
            new TableForeignKey({
                columnNames: ['patientUserId'],
                referencedColumnNames: ['userId'],
                referencedTableName: 'patient',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'medical_history',
            new TableForeignKey({
                columnNames: ['doctorUserId'],
                referencedColumnNames: ['userId'],
                referencedTableName: 'doctor',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medical_history');
    }
}
