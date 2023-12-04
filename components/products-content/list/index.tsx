import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("/product", fetcher);

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data.map(
            (item: ProductTypeList) => (
              console.log("item", item),
              (
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  color={item.color}
                  currentPrice={item.currentPrice}
                  key={item.id}
                  images={item.images}
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
