import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      id,
    });
    this.cars.push(car);
    console.log(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    //o uso do filter retorna uma lista de objetos, o find retorna apenas 1 objeto
    const Allcars = this.cars.filter((car) => {
      if (
        car.available === true || //todos carros disponíveis
        (category_id && car.category_id === category_id) || //carros disponíveis pelo nome da categoria.
        (brand && car.brand === brand) || //carros disponíveis pela marca
        (name && car.name === name) //carros disponíveis pelo nome
      ) {
        return car;
      }
      return null;
    });

    return Allcars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id);
  }

  //atualizar status do carro após ser reservado ou devolvido
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
