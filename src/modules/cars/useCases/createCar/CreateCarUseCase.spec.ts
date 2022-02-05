import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  //teste de criação de novo carro
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Name Car',
      daily_rate: 100, //valor da diária
      license_plate: 'ABC-1234',
      fine_amount: 60, //multa de atraso
      brand: 'Marca', //Marca
      category_id: 'Category',
    });

    expect(car).toHaveProperty('id');
  });

  //teste de verificação de cadastro de mesmo n. placa
  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Name Car',
      daily_rate: 100, //valor da diária
      license_plate: 'ABC-1234',
      fine_amount: 60, //multa de atraso
      brand: 'Marca', //Marca
      category_id: 'Category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car 2',
        description: 'Name Car',
        daily_rate: 100, //valor da diária
        license_plate: 'ABC-1234',
        fine_amount: 60, //multa de atraso
        brand: 'Marca', //Marca
        category_id: 'Category',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  //teste de verificação de cadastro de carro já disponivel como default
  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Name Car',
      daily_rate: 100, //valor da diária
      license_plate: 'ABD-1234',
      fine_amount: 60, //multa de atraso
      brand: 'Marca', //Marca
      category_id: 'Category',
    });
    expect(car.available).toBe(true);
  });
});
