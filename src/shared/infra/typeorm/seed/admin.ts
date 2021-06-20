import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  //seed de criação de usuário via SQL puro, na mão
  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values
    ('${id}', 'admin', 'admin@rentlx.com.br', '${password}', true, 'now()', 'xxxxxxxx' ) `,
  );

  await connection.close; //fecha a conexão
}

create().then(() => console.log('User admin created!'));
