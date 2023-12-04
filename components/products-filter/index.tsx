import { useState } from "react";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";

// data
import { useQuery } from "react-query";
import { CategoryService } from "../../utils/service/category";
import productsColors from "./../../utils/data/products-colors";
import productsSizes from "./../../utils/data/products-sizes";
const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: category } = useQuery<any>(["CategoryService"], () =>
    CategoryService.get({ page: 1 })
  );
  const addQueryParams = () => {
    // query params changes
  };

  console.log("category", category);

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Thêm tìm kiếm <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Danh mục</button>
          <div className="products-filter__block__content">
            {category?.data?.map((type: any) => (
              <Checkbox key={type.id} name="product-type" label={type.name} />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            {/* <Range
              min={0}
              max={20}
              defaultValue={[3, 10]}
              tipFormatter={(value) => `${value}%`}
            /> */}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map((type) => (
              <Checkbox
                type="square"
                key={type.id}
                name="product-size"
                label={type.label}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Màu sắc</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {productsColors.map((type) => (
                <CheckboxColor
                  key={type.id}
                  valueName={type.color}
                  name="product-color"
                  color={type.color}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
