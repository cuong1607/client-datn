import { useState } from "react";
import List from "./list";
import { Select } from "antd";

const ProductsContent = ({
  product,
  returnFilter,
}: {
  product: any;
  returnFilter: (filter: any) => void;
}) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Danh sách kính</h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${
            orderProductsOpen ? "products-order-open" : ""
          }`}
        >
          <div className="products__filter__select">
            <h4>Hiển thị sản phẩm: </h4>
            <div className="select-wrapper">
              <Select
                defaultValue="asc"
                style={{ width: 120 }}
                onChange={(value) => {
                  returnFilter({ order: value });
                }}
                options={[
                  { value: "desc", label: "Mới nhất" },
                  { value: "asc", label: "Cũ nhất" },
                ]}
              />
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sắp xếp theo: </h4>
            <div className="select-wrapper">
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={(value) => {
                  returnFilter({ sort: value });
                }}
                options={[
                  { value: "desc", label: "Tăng - Giảm" },
                  { value: "asc", label: "Giảm - Tăng" },
                ]}
              />
            </div>
          </div>
        </form>
      </div>

      <List product={product} />
    </section>
  );
};

export default ProductsContent;
