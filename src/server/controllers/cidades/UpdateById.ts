import { Request, Response }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';
import { ICidade } from '../../database/models';

interface IParamsProps{
  id: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> { }

export const updateByIdValidation = validation( (getschema) => ({
  body: getschema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
  params: getschema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }))  
}));

export const  updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res:Response) => {

  const result = await CidadesProvider.updateById(req.params.id, req.body);
  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  
  return res.status(StatusCodes.OK).json(result);
};