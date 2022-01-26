import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car | undefined>;

  findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]>; //encontrar carros disponíveis

  findById(id: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
export { ICarsRepository };
