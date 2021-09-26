import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name,
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const AllSpecifications = this.specifications.filter((specification) =>
      //configure o tsconfig.json, coloca o "strict" como false, para que algumas validações do TypeScript não sejam feitas.
      ids.includes(specification.id),
    );
    console.log(AllSpecifications);
    return AllSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
