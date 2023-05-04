import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';




export const updateById = async (cidade: ICidade ): Promise< Number | Error > => {
  try {
    const [result]: any = await Knex(ETableNames.cidade).where('id').update('nome');
    if ( typeof result === 'object'){
      return result.nome;
    } else if ( typeof result === 'number') {
      return result;
    } 
    return new Error('Erro ao atualizar registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro');
  }  
};