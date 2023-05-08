import { Request, Response }  from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamsProps{
  id?: number;
}


export const getByIdValidation = validation( (getschema) => ({
  params: getschema<IParamsProps>(yup.object().shape({
    id: yup.number().required(),
  }))  
}));

export const getById  = async (req: Request<IParamsProps>, res:Response) => {
  
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: 'O parânmeetro id precisa ser informado.'
      }
    });
  }
  const result  = await CidadesProvider.getById(req.params.id);

  if(result instanceof Error){
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: result.message
      }
    });
  }
  console.log(req.body);

  return res.status(StatusCodes.OK).json(result);
};