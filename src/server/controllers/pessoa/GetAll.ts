import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { PessoasProvider } from '../../database/providers/Pessoa';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps{
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string()
  }))
}));

export const getSchema = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) =>{
  const result = await PessoasProvider.getAll(req.query.page || 1, req.query.filter || '', req.query.limit || 7);
  const count = await PessoasProvider.count('');

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }else if (count instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: count.message
      }
    });
  }

  res.setHeader('acess-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);

};