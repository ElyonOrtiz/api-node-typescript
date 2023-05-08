import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';




export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames)
      .select('*')
      .where('id','=', id)
      .first();

    if (result) return result;

    return new Error('Erro ao realizar consulta no banco de dados');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao realizar consulta no banco de dados');
  }
};