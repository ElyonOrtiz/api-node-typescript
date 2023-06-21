import { Router } from 'express';
import { CidadedesController, PessoasController, UsersController } from './../controllers/';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, Dev!');
});

// RouterOfCidade
router.get('/cidades', ensureAuthenticated,
  CidadedesController.getAllValidation,
  CidadedesController.getAll);


router.post('/cidades', ensureAuthenticated,
  CidadedesController.createValidation,
  CidadedesController.create );


router.get('/cidades/:id', ensureAuthenticated,
  CidadedesController.getByIdValidation,
  CidadedesController.getById
);

router.put('/cidades/:id', ensureAuthenticated,
  CidadedesController.updateByIdValidation,
  CidadedesController.updateById
);

router.delete('/cidades/:id', ensureAuthenticated,
  CidadedesController.deleteByIdValidation,
  CidadedesController.deleteById
);

//RoutersOfPersons
router.get('/pessoas', ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.getAll);


router.post('/pessoas', ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create );


router.get('/pessoas/:id', ensureAuthenticated,
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.put('/pessoas/:id', ensureAuthenticated, 
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

router.delete('/pessoas/:id', ensureAuthenticated,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.post('/entrar', 
  UsersController.singInValidation,
  UsersController.singIn
);

router.post('/cadastrar',
  UsersController.singUpSValidation,
  UsersController.singUp
  
);


export { router };