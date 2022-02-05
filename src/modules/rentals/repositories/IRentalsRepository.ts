import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;

  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental | undefined>;

  findById(id: string): Promise<Rental | undefined>;

  findByUser(user_id: string): Promise<Rental[] | undefined>; //retorna array de alugueis
}

export { IRentalsRepository };
