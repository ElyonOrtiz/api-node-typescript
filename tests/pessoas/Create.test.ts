import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
//let accessToken = ''
//  beforeAll(async () => {
//    const email = 'create-pessoas@gmail.com';
//    await testServer.post('/cadastrar').send({
//       email, senha: '12345678', nome: 'teste'
//    });
//    const singInRes = await testServer.post('/entrar').send({email, senha:'12345678'});
//
//    accessToken = singInRes.body.accessToken;
//  })
describe('Pessoas - Create',()=> {
  
  
  let cidadeId: number | undefined = undefined;
  beforeAll ( async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  });
  it('Cria Registro', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Cria registro com nome curto', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        nome: 'el',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId,
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body');
  });

  it('Cria registro com sobre nome curto ', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        sobreNome: 'Or',
        nome: 'Elyon',
        email: 'test@gmail.com',
        cidadeId,
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body');
  });

  it('Cria registro com email invalido', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        email: 'email',
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        cidadeId,
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body');
  });
  
  it('Cria registro com cidade inexistente ', async ()=> {
    const res1 = await testServer
      .post('/pessoas')
      .send({ 
        cidadeId: '999999',
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors');
  });
  it('Tenta criar registro com cidadeId inválido', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId: 'teste',
        email: 'juca@gmail.com',
        nomeCompleto: 'Juca da Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

    const res1 = await testServer
      .post('/pessoas')
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
    expect(res1.body).toHaveProperty('errors.body.nome');
    expect(res1.body).toHaveProperty('errors.body.sobreNome');
  });
});