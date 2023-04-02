import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

//autenticação de usuário
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  //1. Testa se é possível autenticar um novo usuário
  it('should be able to authenticate a new user', async () => {
    const user: ICreateUserDTO = {
      phone: '62999756514',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };

    await createUserUseCase.execute(user); // Usuário criado

    //autenticação do usuário
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    console.log(result);

    expect(result).toHaveProperty('token'); //espera recever um token
  });

  //2. Verifica se o usuário é inexistente
  it('should not be able to authenticate an no existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  //3. Testa se é possível autenticar com senha incorreta
  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      phone: '62999756514',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test Error',
    };

    await createUserUseCase.execute(user); // Usuário criado
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
