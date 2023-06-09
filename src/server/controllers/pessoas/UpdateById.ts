import { Request, Response } from 'express';
import { IPessoa } from '../../database/models';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { PessoasProvider } from '../../database/providers/Pessoa';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> {    
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number()
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome:yup.string().min(3).max(150).required(),
    sobreNome:yup.string().min(3).max(150).required(),
    email:yup.string().email().required(),
    cidadeId:yup.number().integer().moreThan(0).required(),
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) =>{
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default: 'O parâmetro Id é obrigatório'
      }
    });
  }

  const result = await PessoasProvider.updateById(req.params.id, req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};