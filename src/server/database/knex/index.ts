import { knex } from 'knex';
import { development, production, test } from './Environment';




const getEnvireoment = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return production;
    case 'test': return test;

    default: development;  
  }
};

export const Knex = knex(getEnvireoment()); 