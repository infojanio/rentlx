import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

//injeta todas as dependências referentes a provider
//parei 10:40 s
