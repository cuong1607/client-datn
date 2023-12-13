import { useQuery } from "react-query";
import ProductsCarousel from "./carousel";
import { ProductService } from "utils/service/product";
import React from "react";
const initialFilterQuery = {};
const ProductsFeatured = () => {
  const [page, setPage] = React.useState<number>(1);
  const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
  const { data: product } = useQuery<any>(["product", filterQuery, page], () =>
    ProductService.get({ page, ...filterQuery })
  );
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>BỘ SƯU TẬP NỔI BẬT</h3>
          <a
            href="/products"
            className="btn btn--rounded btn--border hvr-float-shadow"
          >
            Xem tất cả
          </a>
        </header>

        <ProductsCarousel products={product?.data} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
