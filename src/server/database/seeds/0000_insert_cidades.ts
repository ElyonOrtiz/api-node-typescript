import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';



export const seed = async (knex: Knex) => {
  const [{count}] = await knex(ETableNames.cidade).count<[{count: number}]>('* as count');   

  if (!Number.isInteger(count)  || Number(count)> 0) return;

  const cidadesToInsert = cidadesRondonia.map(nomeDaCidade => ({nome: nomeDaCidade}));
  await knex(ETableNames.cidade).insert(cidadesToInsert);

};


const cidadesRondonia = [ 
  'Alta Floresta do Oeste',
  'Alto Alegre do Parecis',
  'Alto Paraíso',
  'Alvorada do Oeste',
  'Ariquemes',
  'Buritis',
  'Cabixi',
  'Cacaulândia',
  'Cacoal',
  'Campo Novo de Rondônia',
  'Candeias do Jamari',
  'Castanheiras',
  'Cerejeiras',
  'Chupinguaia',
  'Colorado do Oeste',
  'Corumbiara',
  'Costa Marques',
  'Cujubim',
  'Espigão do Oeste',
  'Governador Jorge Teixeira',
  'Guajará-Mirim',
  'Itapuã do Oeste',
  'Jaru',
  'Ji-Paraná',
  'Machadinho do Oeste',
  'Ministro Andreazza',
  'Mirante da Serra',
  'Monte Negro',
  'Nova Brasilândia do Oeste',
  'Nova Mamoré',
  'Nova União',
  'Novo Horizonte do Oeste',
  'Ouro Preto do Oeste',
  'Parecis',
  'Pimenta Bueno',
  'Pimenteiras do Oeste',
  'Porto Velho',
  'Presidente Médici',
  'Primavera de Rondônia',
  'Rio Crespo',
  'Rolim de Moura',
  'Santa Luzia do Oeste',
  'São Felipe do Oeste',
  'São Francisco do Guaporé',
  'São Miguel do Guaporé',
  'Seringueiras',
  'Teixeirópolis',
  'Theobroma',
  'Urupá',
  'Vale do Anari',
  'Vale do Paraíso',
  'Vilhena'];