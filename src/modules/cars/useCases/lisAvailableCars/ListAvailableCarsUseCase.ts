import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  brand?: string;
  name?: string;
  category_id?: string;
}
@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      name,
      category_id,
    );
    //estou usando o console.log pq não consegui fazer retornar no Insomnia
    console.log('UseCase=', cars); //lista carros disponíveis
    return cars;
  }
}
export { ListAvailableCarsUseCase };
