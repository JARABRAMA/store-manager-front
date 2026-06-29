export type Product = {
  id: string | null;
  name: string;
  price: number;
  stock: number;
  description: string | null;
  categories: string[] | null;
  imageUrl: string | null;
};
