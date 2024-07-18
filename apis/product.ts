export interface ListParams {
  limit: number
  skip: number
}

export interface ProductResultModel {
  products: Product[];
  total:    number;
  skip:     number;
  limit:    number;
}

export interface Product {
  id:                   number;
  title:                string;
  description:          string;
  category:             Category;
  price:                number;
  discountPercentage:   number;
  rating:               number;
  stock:                number;
  tags:                 string[];
  brand?:               string;
  sku:                  string;
  weight:               number;
  dimensions:           Dimensions;
  warrantyInformation:  string;
  shippingInformation:  string;
  availabilityStatus:   AvailabilityStatus;
  reviews:              Review[];
  returnPolicy:         string;
  minimumOrderQuantity: number;
  meta:                 Meta;
  images:               string[];
  thumbnail:            string;
}

export enum AvailabilityStatus {
  InStock = "In Stock",
}

export enum Category {
  Furniture = "furniture",
  Groceries = "groceries",
}

export interface Dimensions {
  width:  number;
  height: number;
  depth:  number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode:   string;
  qrCode:    string;
}

export interface Review {
  rating:        number;
  comment:       string;
  date:          Date;
  reviewerName:  string;
  reviewerEmail: string;
}

enum Api {
  list = 'https://dummyjson.com/products',
}

export async function list(params: ListParams) {
  return useHttp.get<ProductResultModel>(Api.list, params)
}
export async function getById(id: number) {
  return useHttp.get<Product>(Api.list+'/'+id)
}

