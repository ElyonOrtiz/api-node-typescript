import { Request, Response } from 'express';

import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from 'yup'
import { UsuariosProvider } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { JWTService, PasswordCrypto } from '../../shared/services';

 

interface IBodyProps {
  email: string,
  senha: string
}

export const singInValidation = validation((getSchema) => ({
 body: getSchema<IBodyProps>(yup.object().shape({
   email: yup.string().required().min(6).email(),
   senha: yup.string().required().min(5),
 }))
}));

export const singIn = async (req:Request<{},{}, IUsuario>, res: Response) => {
  const {email, senha} = req.body;
  const usuario = await UsuariosProvider.getByEmail(email);


  if(!email && senha) {
   return res.status(StatusCodes.BAD_REQUEST).json({
    errors: {
     default: 'Email e senha obrigatórios'
    }
   })
  }
  if (usuario instanceof Error){
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
     default: 'Email ou senha inválidos, tente novamente ou cadastre-se'
    }
   })
  }
  const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);

  if (!passwordMatch) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
       default: 'Email ou senha inválidos, tente novamente ou cadastre-se'
      }
     })
    } else{

      const accessToken = JWTService.singn({uid: usuario.id})
      if(accessToken === 'JWT_SECRET_NOT_FOUND'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errror: {
            default: 'erro ao gerrar token de acesso'
          }
        })

      }
    return res.status(StatusCodes.OK).json({accessToken});
  }
}