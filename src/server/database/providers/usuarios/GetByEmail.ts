import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPessoa, IUsuario } from "../../models"


export const getByEmail = async (email:string): Promise <IUsuario | Error > => {
 try {
  const result = await Knex(ETableNames.usuario)
  .select('*')
  .where('email', '=', email)
  .first();

  if(result) return result;
   return new Error('Erro ao fazer a consulta do registro no banco, Esse email não existe')
 } catch (error) {
  console.log(error);
   return new Error('Erro ao fazer a consulta do registro no banco, esse email não existe')  
 }
}