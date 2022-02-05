import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate(); //um dia a mais

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  //verifica se é possível criar uma locação nova
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    console.log(rental);
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  //Não poderá ser possível criar um novo agendamento quando o usuário estiver com um aberto
  it('should not be able to create a new rental if there is another open to same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '2222',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('There is a rental in progress for user!'));
  });

  //Esse teste não funcionou, Car { id: undefined -> [TypeError: Cannot set property 'available' of undefined]

  //Não poderá ser possível criar um novo agendamento quando o carro estiver alugado
  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '1234',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '1111',
        expected_return_date: dayAdd24Hours,
        user_id: '5432',
      }),
    ).rejects.toEqual(new AppError('Car is unavailable!'));
  });

  //Não poderá ser possível criar um novo agendamento com tempo menor que 24h
  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '1234',
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
