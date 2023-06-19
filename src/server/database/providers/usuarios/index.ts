import * as create from './Create'
import * as getByEmail from './GetByEmail'
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'

export const UsuariosProvider = {
  ...create,
  ...getByEmail,
  ...deleteById,
  ...updateById,
}