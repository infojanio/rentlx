import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatar_file: string;
}
//faz a atualização do avata do usuário
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    //const usersRepository = getRepository(User);
    const user = await this.usersRepository.findById(user_id);
    user?.avatar = avatar_file;

    await this.usersRepository.create(user);

    /*
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    




    
    user.avatar = avatar_file;

    //se já existir avatar de usuário irá atualizar, se não irá incluir
    await usersRepository.save(user);

    return user;
  }
}
*/
  }
}
export { UpdateUserAvatarUseCase };