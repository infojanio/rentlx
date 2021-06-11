import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  //1. teste de criação do usuário
  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });
    this.users.push(user);
  }

  //2. teste de verificação de cadastro de usuário já existente
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  //3. teste de verificação de
  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
export { UsersRepositoryInMemory };
