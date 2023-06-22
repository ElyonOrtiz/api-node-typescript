import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - DeleteById' , () => {

  let accessToken = '';

  beforeAll(async () => {
    await testServer
      .post('/cadastrar')
      .send({
        nome: 'Elyon',
        sobreNome: 'Ortiz',
        email: 'elyon.tes@gmail.com',
        senha: '12345678'
    })
    const singIn = await testServer
     .post('/entrar')
     .send({email: 'elyon.tes@gmail.com', senha: '12345678'})

    accessToken = singIn.body.accessToken
  })

  it ('Apagar Registro' , async () => {


    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias Do Sul' });
    

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const deleteCid = await testServer
      .delete(`/cidades/${res1.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(deleteCid.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it ('Tenta apagar registro que não existe' , async () => {


    const res1 = await testServer
      .delete('/cidades/9999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();
    
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  }

  );
});