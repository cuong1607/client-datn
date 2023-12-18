import { ProductTypeList } from "types";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

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
              key={item.id}
              product_images={item?.product_images}
              product_prices={item?.product_prices}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
