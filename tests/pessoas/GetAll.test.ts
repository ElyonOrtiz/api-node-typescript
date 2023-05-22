import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetAll', () => {
  let cidadeId: number| undefined = undefined;
  beforeAll( async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste'});

    cidadeId = resCidade.body;
  });
  it ('Cria Registro' , async () => {
    const res1 = await testServer
      .post('/pesssoas')
      .send({  
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId, });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pesssoas')
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });

});
