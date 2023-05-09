import { Request, Response }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface IQueryProps{
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}


export const getAllValidation = validation((getschema) => ({
  query: getschema<IQueryProps>(yup.object().shape({
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0),
    filter: yup.string(),
    id:yup.number().moreThan(0).default(0),
  })),  
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id || 0));
  const count = await CidadesProvider.count(req.query.filter);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:{
        default: result.message
      }
    });
  }else if( count instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: count.message
      }
    });
  }
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};