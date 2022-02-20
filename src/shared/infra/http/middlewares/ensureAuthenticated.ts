import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '../../../../config/auth';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

//garante que o usuário que requisita a rota estará autenticado
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  //dispara o erro caso o token não seja válido
  if (!authHeader) {
    // throw new Error('JWT token is missing!');
    throw new AppError('JWT token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.secret_refresh_token); //esperamos receber o refresh

    const { sub: user_id } = decoded as ITokenPayLoad;

    const user = await userTokensRepository.findUserByIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      //throw new Error('User does not exist!');
      throw new AppError('User does not exist!', 401);
    }
    //subscrevemos a tipagem da própria biblioteca
    request.user = {
      id: user_id,
    };

    next();
  } catch {
    //throw new Error('Token inválido!');
    throw new AppError('Token inválido!', 401);
  }
}
//verifica se o usuário está autenticado na aplicação
