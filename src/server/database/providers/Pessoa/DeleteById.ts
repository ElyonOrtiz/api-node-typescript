import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';




export const deleteById = async(id:number, pessoa: Omit<IPessoa, 'id'>): Promise<void| Error> =>{
  try {
    const [{count}] =await Knex(ETableNames.cidade)
      .where('id', '=', pessoa.CidadeId)
      .count<[{ count:number}]>('* as count');

    if(count === 0){
      return  new Error('A cidade usada no cadastro não foi encontrada');
    }
    const result = await Knex(ETableNames.pessoa)
      .where('id', '=', id)
      .del(); 

    if(result > 0) return;

    return new Error ('Erro ao apagar registro');
  } catch (error) {
    console.log(error);
    return new Error ('Erro ao apagar registro');
  
  }
};