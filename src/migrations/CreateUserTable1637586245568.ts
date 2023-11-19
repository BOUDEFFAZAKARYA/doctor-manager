/* eslint-disable prettier/prettier */


/* eslint-disable prettier/prettier */


import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1637586245568 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int', // or 'integer' depending on your database
                        isGenerated: true,
                        isPrimary: true,
                        isNullable: false,
                        generationStrategy: 'increment', // This is for auto-increment
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enum: ['doctor', 'patient'],
                        default: "'patient'",
                    },
                ],
            }),
            true,
        );

        // Add any additional constraints or indices here if needed
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }
}
