import ProductsCarousel from "./carousel";
import useSwr from "swr";

const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr("/api/products", fetcher);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>BỘ SƯU TẬP NỔI BẬT</h3>
          <a href="/products" className="btn btn--rounded btn--border">
            Xem tất cả
          </a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
