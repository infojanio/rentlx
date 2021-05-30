import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '../modules/accounts/usesCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/usesCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const upload = multer({
  dest: 'avatar',
});

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  updateUserAvatarController.handle,
);

export { usersRoutes };