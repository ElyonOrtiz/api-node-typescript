import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/Pessoa';





interface IParamsProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema)=> ({
  params: getSchema<IParamsProps> (yup.object().shape({
    id:yup.number()
  }))
}));

export const getById = async (req: Request<IParamsProps>, res: Response)=>{
 
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default: 'O parâmetro "id" deve ser informado'
      }
    });
  }
  const result = await PessoasProvider.getById(req.params.id);
  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  console.log(req.body);
  return res.status(StatusCodes.OK).json(result);
};