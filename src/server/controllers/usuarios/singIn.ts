import { Request, Response } from 'express';

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { UsuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';

 

interface IBodyProps {
  email: string,
  senha: string
}

export const singInValidation = validation((getSchema) => ({
 body: getSchema<IBodyProps>(yup.object().shape({
   email: yup.string().required().min(6),
   senha: yup.string().required().min(5).email(),
 }))
}));

export const singIn = async (req:Request<{},{}, IUsuario>, res: Response) => {
  const {email, senha} = req.body;
  const result = await UsuariosProvider.getByEmail(email);

  if(!email && senha) {
   return res.status(StatusCodes.BAD_REQUEST).json({
    errors: {
     default: 'Email e senha obrigatórios'
    }
   })
  }
  if (result instanceof Error){
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
     default: 'Email ou senha inválidos, tente novamente ou cadastre-se'
    }
   })
  }
  if (senha !== result.senha){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
       default: 'Email ou senha inválidos, tente novamente ou cadastre-se'
      }
     })
    } else{
    return res.status(StatusCodes.OK).json({accessToken: 'teste.teste.teste'});
  }
}