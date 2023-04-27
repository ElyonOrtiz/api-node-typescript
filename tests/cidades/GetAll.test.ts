import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { number } from 'yup';



describe('Cidades - GetAll' , () => {


  it ('Busque registro todos os registros' , async () => {


    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Porto Velho' });
    

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
    const res2 = await testServer
      .post('/cidades')
      .send({ nome: 'Colorado Do Oeste' });
    

    expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res2.body).toEqual('number');

    const getAll = await testServer
      .post('/cidades')
      .send();

    expect(Number(getAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(getAll.statusCode).toEqual(StatusCodes.OK);
    expect(getAll.body.lengh).toBeGreaterThan(0);

  }

  );
});