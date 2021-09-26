import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create List All Category', () => {
  //roda antes de tudo
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations(); //criação da migration

    const id = uuid();
    const password = await hash('admin', 8);

    //seed de criação de usuário via SQL puro, na mão
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values
      ('${id}', 'admin', 'admin@rentlx.com.br', '${password}', true, 'now()', 'xxxxxxxx' ) `,
    );
  });

  //roda depois de tudo
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  //Deve ser possível listar todas as categorias
  it('Should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentlx.com.br',
      password: 'admin',
    });
    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    console.log(response.body);

    expect(response.status).toBe(201); //201 permitiu a listagem de categorias
    expect(response.body.length).toBe(1); //retorna 1 array
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category Supertest');
  });
});
