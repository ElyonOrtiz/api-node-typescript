import { ICidade, IPessoa, IUsuario } from '../../models';


declare module 'knex/types/tables'{
    interface Tables {
        cidades: ICidade
        pessoa: IPessoa
        Usuario: IUsuario
    }
}