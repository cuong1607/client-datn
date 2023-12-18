export type VotesType = {
  count: number;
  value: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
};

export type ProductType = {
  id: string;
  name: string;
  price: string;
  amount: number;
  color: string;
  discount?: string;
  product_prices?: any[];
  product_images: Image[] | undefined;
};
interface Image {
  path: string;
}

export type ProductTypeList = {
  id: string;
  name: string;
  product_images: any;
  product_prices: any[];
};

export type ProductStoreType = {
  id: string;
  name: string;
  color?: string;
  price?: number;
  amount: number;
  product_images?: Image[];
  product_prices?: any[];
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
