import { useState } from "react";
import List from "./list";

const ProductsContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Kính thời trang</h2>
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
              <select>
                <option>Phổ biến</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sắp xếp theo: </h4>
            <div className="select-wrapper">
              <select>
                <option>Tăng - Giảm</option>
                <option>Giảm - Tăng</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List />
    </section>
  );
};

export default ProductsContent;
