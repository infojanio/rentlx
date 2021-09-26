import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
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

  //Deve ser possível criar uma nova categoria
  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentlx.com.br',
      password: 'admin',
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(201); //201 permitiu a inclusão da nova categoria
  });
});

//Não deve ser possível criar uma categoria já existente
it('Should not be able to create a new category with name exists', async () => {
  const responseToken = await request(app).post('/sessions').send({
    email: 'admin@rentlx.com.br',
    password: 'admin',
  });
  const { token } = responseToken.body;

  const response = await request(app)
    .post('/categories')
    .send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    })
    .set({
      Authorization: `Bearer ${token}`,
    });
  expect(response.status).toBe(401); //401 não permitiu a inclusão
});
