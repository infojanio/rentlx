import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    //recuperar todas as informações do aluguel
    const rental = await this.rentalsRepository.findById(id);

    //recuperar todas as informações do carro
    const car = await this.carsRepository.findById(rental.car_id);

    //o mínimo de diária cobrada deve ser 1
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exist!');
    }

    //Verifica o tempo de aluguel
    const dateNow = this.dateProvider.dateNow();

    //calcula quantas diárias geraram
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );
    //se o tempo for menor que 24h, cobra 1 diária
    if (daily <= 0) {
      daily = minimum_daily;
    }

    //calcula dias de atraso
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    //calcula o total mais as multas
    let total = 0;
    if (delay > 0) {
      //se houve atraso
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }
    //calcula a quantidade + valor das diárias
    total += daily * car.daily_rate; //total = total + daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental); //finaliza o aluguel
    await this.carsRepository.updateAvailable(car.id, true); //carro disponível

    return rental;
  }
}

export { DevolutionRentalUseCase };
