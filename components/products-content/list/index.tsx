import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";

import { currencyFormat } from "utils";
import React from "react";
interface IProps {
  product: any;
}
const ProductsContent = (props: IProps) => {
  const { product } = props;
  return (
    <>
      {!product?.data && <ProductsLoading />}

      {product?.data && (
        <section className="products-list">
          {product?.data?.map((item: ProductTypeList) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={currencyFormat(Number(item.price))}
              color={item.color}
              currentPrice={currencyFormat(Number(item.price))}
              key={item.id}
              product_images={
                item?.product_images?.length
                  ? item.product_images?.map((it: { path: string }) => it.path)
                  : item?.product_images
              }
              item={item}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
