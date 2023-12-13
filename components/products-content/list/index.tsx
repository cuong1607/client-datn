import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";
import { useQuery } from "react-query";
import { ProductService } from "../../../utils/service/product";
import { currencyFormat } from "utils";
import React from "react";
const initialFilterQuery = {};
const ProductsContent = () => {
  const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
  const [page, setPage] = React.useState(1);
  const { data: product, error } = useQuery<any>(
    ["color", filterQuery, page],
    () => ProductService.get({ page: page, ...filterQuery })
  );
  if (error) return <div>Failed to load users</div>;
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
