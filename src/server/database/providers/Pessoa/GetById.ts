import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';




export const getById = async(id:number) : Promise< IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select('*')
      .where('id', '=', id)
      .first();

    if(result > 0) return result;

    return new Error('Erro ao consultar todos os registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar todos os registros do banco de dados');
        
  }
};