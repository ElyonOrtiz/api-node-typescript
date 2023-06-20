import { Request, Response } from 'express';

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { UsuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { error } from 'console';

interface IBodyProps extends Omit<IUsuario, 'id'> {
}

export const singUpSValidation = validation((getSchema) => ({
 body: getSchema<IBodyProps>(yup.object().shape({
  email: yup.string().email().required(),
  nome: yup.string().required().min(3).max(50),
  sobreNome: yup.string().required().min(3).max(50),
  senha: yup.string().required().min(6),
 }))
}));

export const singUp= async (req:Request<{}, {}, IUsuario>, res: Response) => {
  const { email } = req.body
  const result = await UsuariosProvider.getByEmail(email)

  if(result instanceof Error){

    const result1 = await UsuariosProvider.create(req.body);

    if (result1 instanceof Error){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
       errors: {
        default: result1.message
       }
      })
     }else{
     return res.status(StatusCodes.CREATED).json(result1);
     }
  }
 if(email === result.email){
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
     default: "Esse email já está em uso tente outro email ou recupere sua senha"
    }
   })
 }
}