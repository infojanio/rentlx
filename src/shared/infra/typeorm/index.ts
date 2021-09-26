import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test' //usa o banco de test
          ? 'rentx_test' //usa o banco padrão
          : defaultOptions.database,
    }),
  );
};
/*



import { Connection, createConnection, getConnectionOptions } from 'typeorm';

//verifica se o yarn vai apontar para jest test ou desenvolvimento, com variáveis de ambiente
export default async (name = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(); //teremos todas as informações do ormconfig

  //verifica se o comando é de test ou dev
  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === 'test' //usa o banco de test
          ? 'rentlx' //usa o banco padrão
          : defaultOptions.database,
    }),
  );
};




*/
