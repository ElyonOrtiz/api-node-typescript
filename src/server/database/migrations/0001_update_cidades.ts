import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function updateknex(knex: Knex) {
  return knex(ETableNames.cidade).where;
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cidade}`);
    });
}