import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  //Deve ser possível cadastrar um novo carro
  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });
    await this.repository.save(car);
    return car;
  }

  //Encontra carro por placa
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      license_plate,
    });
    return car;
  }

  //ATENÇÃO: O método findAvailable retorna o filtro no console.log, mas não retorna no Insominia

  // Encontra todos os carros disponíveis
  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[] | undefined> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    //busca por marca
    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    //busca por nome
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    //busca por categoria
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
    //console.log(cars); No insominia não retorna os dados filtrados
  }
}
export { CarsRepository };
