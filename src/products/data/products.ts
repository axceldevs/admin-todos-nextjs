export interface Product {
  id    : string;
  name  : string;
  price : number;
  rating: number;
  image : string;
}


export const products:Product[] = [
  {
    id: 'UUID-ABC-1',
    name: 'Teslo Hoodie',
    price: 100000,
    rating: 5,
    image: '/images/products/1623735-00-A_0_2000.jpg',
  },
  {
    id: 'UUID-ABC-2',
    name: 'Teslo Cap',
    price: 85000,
    rating: 3,
    image: '/images/products/1657916-00-A_1.jpg',
  },
  {
    id: 'UUID-ABC-3',
    name: 'Let the sunshine',
    price: 96900,
    rating: 2,
    image: '/images/products/1700280-00-A_1.jpg',
  },
  {
    id: 'UUID-ABC-4',
    name: 'Cybertruck Hoodie',
    price: 78000,
    rating: 5,
    image: '/images/products/1742702-00-A_0_2000.jpg',
  },
]