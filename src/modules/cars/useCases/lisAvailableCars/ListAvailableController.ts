import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvalableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const cars = listAvalableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });
    console.log('controller=', cars);
    return response.json(cars);
  }
}
export { ListAvailableController };
