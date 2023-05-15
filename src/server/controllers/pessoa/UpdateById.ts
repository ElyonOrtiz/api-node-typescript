import { IPessoa } from '../../database/models';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';







interface IQueryProps {
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> {    
}

export const updateByIdValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number()
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().notRequired().min(3),
    sobreNome:yup.string().notRequired().min(3),
    email: yup.string().email().notRequired(),
    cidadeId: yup.number().notRequired(),
  })),
}));

