import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatar_file: string;
}
//faz a atualização do avata do usuário
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    //const usersRepository = getRepository(User);
    const user = await this.usersRepository.findById(user_id);

    await deleteFile(`./tmp/avatar/${user.avatar}`);
    user.avatar = avatar_file; //não pode ser acesso

    await this.usersRepository.create(user);
  }
}
export { UpdateUserAvatarUseCase };

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
