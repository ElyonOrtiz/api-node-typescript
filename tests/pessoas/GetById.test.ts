import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetById', () => {
  let cidadeId: number| undefined = undefined;
  beforeAll( async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  });
  it ('Cria Registro' , async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({  
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });

});

it ('Tenta Buscar registro que não existe' , async () => {
  const res1 = await testServer
    .get('/cidades/9999')
    .send();
    
  expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  expect(res1.body).toHaveProperty('errors.default');
});