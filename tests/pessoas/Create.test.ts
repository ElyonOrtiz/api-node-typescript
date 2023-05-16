import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';





describe('Pessoa - Create',()=> {
  it('Cria registro', async ()=> {

    const res1 = await testServer
      .post('/pessoa')
      .send({ 
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'test@gmail.com',
        cidadeId: '33'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Cria registro com nome curto', async ()=> {
    const res1 = await testServer
      .post('/pessoa')
      .send({ nome: 'el'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.');
  });

  it('Cria registro com sobre nome curto ', async ()=> {
    const res1 = await testServer
      .post('/pessoa')
      .send({ sobreNome: 'Or'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.');
  });

  it('Cria registro com email invalido', async ()=> {
    const res1 = await testServer
      .post('/pessoa')
      .send({ email: 'email'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.');
  });
  
  it('Cria registro com cidade inexistente ', async ()=> {
    const res1 = await testServer
      .post('/pessoa')
      .send({ cidadeId: '9999'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.');
  });
});