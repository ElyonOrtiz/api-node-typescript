import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/Pessoa';




interface IParamsProps {
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0),
  }))
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {

  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default:'O parâmetro "id" é obrigatório'
      }
    });
  }

  const result = await PessoasProvider.deleteById(req.params.id);
  if(result instanceof Error){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();

};