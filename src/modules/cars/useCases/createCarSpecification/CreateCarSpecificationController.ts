import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

//parei no min 11:16
class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    console.log(cars);
    return response.json(cars);
  }
}
export { CreateCarSpecificationController };
