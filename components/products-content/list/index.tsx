import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";
import { useQuery } from "react-query";
import { ProductService } from "../../../utils/service/product";
const ProductsContent = () => {
  const { data: product, error } = useQuery<any>(["color"], () =>
    ProductService.get({ page: 1, limit: 999 })
  );
  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!product?.data && <ProductsLoading />}

      {product?.data && (
        <section className="products-list">
          {product?.data?.map(
            (item: ProductTypeList) => (
              console.log("item", item),
              (
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  color={item.color}
                  currentPrice={Number(item.price)}
                  key={item.id}
                  product_images={item.product_images?.map(
                    (it: { path: string }) => it.path
                  )}
                  item={item}
                />
              )
            )
          )}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
