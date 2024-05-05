import { Injectable } from "@angular/core";

const domain = 'https://result.school';

export enum ProductType {
  Poke = 'poke',
  Salad = 'salad',
  Porridge = 'porridge', /* каша */
  Milkshake = 'milkshake',
  Smoothie = 'smoothie',
  Goodies = 'goodies', /* вкусности */
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  structure: string; /* состав */
  nutritional_value: string; /* пищевая ценность: бжу */
  type: ProductType;
}

// function addDamainToLinkAndImage(product: IProduct) {
//   return {
//     ...product,
//     image: domain + product.image,
//     link: domain + product.link,
//   };
// }

const products: IProduct[] = [
  {
    id: '1',
    title: 'Поке с тунцом',
    description: 'Поке с тунцом - это гавайское блюдо из свежего тунца, риса, овощей и соусов.',
    link: '/products/poke-tuna',
    image: '/img/icons/products/icon-poke.svg',
    structure: 'Тунец, рис, авокадо, огурцы, соусы',
    nutritional_value: 'Белки: 25г, Жиры: 10г, Углеводы: 35г',
    type: ProductType.Poke,
  },
  {
    id: '2',
    title: 'Поке с курицей',
    description: 'Поке с курицей - это гавайское блюдо из куриного мяса, риса, овощей и соусов.',
    link: '/products/poke-chicken',
    image: '/img/icons/products/icon-poke.svg',
    structure: 'Куриное мясо, рис, авокадо, огурцы, соусы',
    nutritional_value: 'Белки: 20г, Жиры: 8г, Углеводы: 30г',
    type: ProductType.Poke,
  },
  {
    id: '3',
    title: 'Салат "Цезарь"',
    description: 'Салат "Цезарь" - классический салат с куриным мясом, сухариками и соусом Цезарь.',
    link: '/products/caesar-salad',
    image: '/img/icons/products/icon-salad.svg',
    structure: 'Куриное мясо, листовой салат, сухарики, соус Цезарь',
    nutritional_value: 'Белки: 15г, Жиры: 12г, Углеводы: 25г',
    type: ProductType.Salad,
  },
  {
    id: '4',
    title: 'Салат "Греческий"',
    description: 'Салат "Греческий" - свежий салат с огурцами, помидорами, сыром фета и маслинами.',
    link: '/products/greek-salad',
    image: '/img/icons/products/icon-salad.svg',
    structure: 'Огурцы, помидоры, сыр фета, маслины, оливковое масло',
    nutritional_value: 'Белки: 10г, Жиры: 15г, Углеводы: 20г',
    type: ProductType.Salad,
  },
  {
    id: '5',
    title: 'Овсяная каша с фруктами',
    description: 'Овсяная каша с фруктами - полезный завтрак из овсянки с свежими фруктами.',
    link: '/products/oatmeal-fruit',
    image: '/img/icons/products/icon-porridge.svg',
    structure: 'Овсянка, молоко, фрукты',
    nutritional_value: 'Белки: 7г, Жиры: 3г, Углеводы: 40г',
    type: ProductType.Porridge,
  },
  {
    id: '6',
    title: 'Молочный коктейль с бананом',
    description: 'Молочный коктейль с бананом - напиток на молоке с добавлением свежего банана.',
    link: '/products/milkshake-banana',
    image: '/img/icons/products/icon-milkshake.svg',
    structure: 'Молоко, банан, мед, ваниль',
    nutritional_value: 'Белки: 5г, Жиры: 3г, Углеводы: 30г',
    type: ProductType.Milkshake,
  },
  {
    id: '7',
    title: 'Смузи "Зеленый"',
    description: 'Смузи "Зеленый" - напиток из свежих зеленых овощей и фруктов.',
    link: '/products/smoothie-green',
    image: '/img/icons/products/icon-smoothie.svg',
    structure: 'Шпинат, банан, яблоко, апельсин',
    nutritional_value: 'Белки: 5г, Жиры: 2г, Углеводы: 25г',
    type: ProductType.Smoothie,
  },
  {
    id: '8',
    title: 'Десертные вкусности',
    description: 'Десертные вкусности - сладкие угощения из фруктов и ягод.',
    link: '/products/goodies-dessert',
    image: '/img/icons/products/icon-goodies.svg',
    structure: 'Фрукты, ягоды, сироп, шоколад',
    nutritional_value: 'Белки: 2г, Жиры: 5г, Углеводы: 20г',
    type: ProductType.Goodies,
  },
  {
    id: '9',
    title: 'Сэндвич с индейкой',
    description: 'Сэндвич с индейкой - перекус из тонкой лавашной основы с нежным мясом индейки.',
    link: '/products/sandwich-turkey',
    image: '/img/icons/products/icon-sandwich.svg',
    structure: 'Лаваш, индейка, овощи, соус',
    nutritional_value: 'Белки: 15г, Жиры: 8г, Углеводы: 30г',
    type: ProductType.Poke,
  },
  {
    id: '10',
    title: 'Мясной пирог',
    description: 'Мясной пирог - традиционное блюдо из слоеного теста с начинкой из мяса и лука.',
    link: '/products/meat-pie',
    image: '/img/icons/products/icon-sandwich.svg',
    structure: 'Говядина, мука, вода',
    nutritional_value: 'Белки: 15г, Жиры: 8г, Углеводы: 30г',
    type: ProductType.Goodies,
  }
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

