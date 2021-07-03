import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvalableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvalableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  //Deve ser possível listar todos os carros disponíveis
  it('should be able to list all available car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car_Description',
      daily_rate: 110,
      license_plate: 'NKE3284',
      fine_amount: 40,
      brand: 'Car_Brand',
      category_id: 'category_id',
    });

    const cars = await listAvalableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  //Deve ser possível listar todos os carros disponíveis por marca
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car_Description',
      daily_rate: 110,
      license_plate: 'NKE3284',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    });

    const cars = await listAvalableCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });

  //Deve ser possível listar todos os carros disponíveis por categoria
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car_Description',
      daily_rate: 110,
      license_plate: 'NKE3284',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: '12345',
    });

    const cars = await listAvalableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
