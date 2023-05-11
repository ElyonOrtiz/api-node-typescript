import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';



export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable();
      table.string('sobreNome').index().notNullable();
      table.string('email').unique().notNullable();
      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar pessoas do sistema.');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.pessoa}`);
    });

}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}
