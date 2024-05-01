import { Injectable } from "@angular/core";

const domain = 'https://result.school';

export enum ProductType {
  Skill = 'skill',
  Intensive = 'intensive',
  Course = 'course',
}

export interface IProduct {
  id: string;
  text: string;
  title: string;
  link: string;
  image: string;
  time: string;
  type: ProductType;
}

function addDamainToLinkAndImage(product: IProduct) {
  return {
    ...product,
    image: domain + product.image,
    link: domain + product.link,
  };
}

const products: IProduct[] = [
  {
  id: '29',
  title: 'TypeScript',
  link: '/products/typescript',
  image: '/img/icons/products/icon-ts.svg',
  text: 'Основы, типы, компилятор, классы, generic, утилиты,\
  декораторы, advanced ...',
  time: 'С опытом 2 недели',
  type: ProductType.Skill,
  },
  {
    id: '30',
    title: 'Git и GitHub',
    link: '/products/git',
    image: '/img/icons/products/icon-git.svg',
    text: 'BLD, история версий, ветвление, удаленный репозиторий\
    релизы, opensourse ...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill,
  },
  {
    id: '910',
    title: 'Redux, Redux Toolkit и BobX',
    link: '/products/state-managers',
    image: '/img/icons/products/icon-state-managers.svg',
    text: 'Redux, React Redux, Redux DevTools, Resux Toolkit, RTK Query,\
    MobX...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill,
  },
  {
    id: '940',
    title: 'React Advanced',
    link: '/products/react',
    image: '/img/icons/products/icon-react.svg',
    text: 'React JS, Хуки, Формы, React Route v6, Context API,\
    Оптимизация, Арзитектура, PWA ...',
    time: 'С опытом 8 недель',
    type: ProductType.Skill,
  },
  {
    id: '920',
    title: 'Первая ступень профессии frontend-разработчика',
    link: '/products/first-stage',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Skill,
  },
  {
    id: '930',
    title: 'Первая ступень профессии frontend-разработчика',
    link: '/products/second-stage',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Skill,
  },
  {
    id: '24',
    title: 'Первая ступень профессии frontend-разработчика',
    link: '/products/base-programming',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Intensive,
  },
  {
    id: '32',
    title: 'Первая ступень профессии frontend-разработчика',
    link: '/products/demo-week',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Intensive,
  },
  {
    id: '33',
    title: 'Первая ступень профессии frontend-разработчика',
    link: '/products/advanced-js',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Intensive,
  },
  {
    id: '28',
    title: 'Курс "основы JavaScript" и 50 заданий',
    link: '/products/javascript',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Course,
  },
  {
    id: '23',
    title: 'Курс "основы JavaScript" и 50 заданий',
    link: '/products/html-css',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Course,
  },
  {
    id: '26',
    title: 'Курс "основы JavaScript" и 50 заданий',
    link: '/products/html-css',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Course,
  },
  {
    id: '27',
    title: 'Курс "основы JavaScript" и 50 заданий',
    link: '/products/html-css',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 3 месяца',
    type: ProductType.Course,
  },
  {
    id: '930',
    title: 'Воркщоп "перспективы в IT"',
    link: '/products/perspectives',
    image: '',
    text: 'JavaScript, Debug, DOM...',
    time: 'С нуля 2 дня',
    type: ProductType.Course,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductsSevice {
  readonly products: IProduct[] = products.map(addDamainToLinkAndImage);

  getById(id: string) {
    return this.products.find((p) => p.id == id);
  }

  get byGroup() {
    return this.products.reduce((group, prod) => {
      if (!group[prod.type]) {
        group[prod.type] = [];
      }
      group[prod.type].push(prod)
      return group
    }, {});
  }
}

