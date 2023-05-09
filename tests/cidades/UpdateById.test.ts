import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';




describe ('Cidades - updateById', () => {
  it('Atualiza registrto', async () => {


    const res1 =  await testServer
      .post('/cidades')
      .send({ nome: 'Colorado do Oeste'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualiza = await testServer
      .put(`/cidades/${res1.body}`)
      .send({ nome: 'Vilhena'});

    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
   
  });

  it('Tenta Atualizar Registro que Não existe', async () => {
    const res1 = await testServer
      .put('/cidades/99999')
      .send({ nome: 'Ouro Preto'});

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});