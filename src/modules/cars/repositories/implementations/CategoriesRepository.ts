import { Category } from '../../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  //padrão singleton -> aproveitar as intâncias
  private static INSTANCE: CategoriesRepository;

  //deixa o constructor privado
  private constructor() {
    this.categories = [];
  }

  //método verifica se tem uma instância já criada -> repassa a instância, senão cria uma nova
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      //se não tiver nenhum valor atribuído
      CategoriesRepository.INSTANCE = new CategoriesRepository(); //criamos uma instância da classe
    }
    return CategoriesRepository.INSTANCE; //se já existir uma instância criada, só retorna ela.
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      create_at: new Date(),
    });

    /*
    ou 
    category.name = name;
    category.description = description;
    category.create_at = new Date();
  */
    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  /*
  findByName(name: string): Category {
    console.log(name);
    throw new Error('Errou');
  }
  */
}
export { CategoriesRepository };
