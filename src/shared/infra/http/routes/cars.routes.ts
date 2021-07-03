import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableController } from '@modules/cars/useCases/lisAvailableCars/ListAvailableController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableController = new ListAvailableController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableController.handle);

export { carsRoutes };
