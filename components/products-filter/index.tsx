import { useState } from "react";
import CheckBoxComponent from "./form-builder/checkbox";
import Slider from "rc-slider";
import { currencyFormat } from "utils";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = ({
  returnFilter,
}: {
  returnFilter: (filter: any) => void;
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const addQueryParams = (value: any) => {};
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
            <CheckBoxComponent
              onChange={(item: any) => {
                const arr = item.map((it: any) => it);
                if (arr?.length) {
                  returnFilter({ category_id: arr.join(", ") || "" });
                } else {
                  returnFilter({ category_id: null });
                }
              }}
              apiUrl="/category"
            />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Giá tiền</button>
          <div className="products-filter__block__content">
            <Range
              min={0}
              max={5000000}
              defaultValue={[50000, 1000000]}
              onChange={(value) => {
                console.log("valuetien, value", value);
              }}
              tipFormatter={(value) => `${currencyFormat(value)}đ`}
            />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Màu sắc</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              <CheckBoxComponent
                onChange={(item: any) => {
                  const arr = item.map((it: any) => it);
                  if (arr?.length) {
                    returnFilter({ color_ids: arr.join(", ") || "" });
                  } else {
                    returnFilter({ color_ids: null });
                  }
                }}
                apiUrl="/color"
              />
            </div>
          </div>
        </div>
        <div className="products-filter__block">
          <button type="button">Thương hiệu</button>
          <div className="products-filter__block__content">
            <CheckBoxComponent
              onChange={(item: any) => {
                const arr = item.map((it: any) => it);
                if (arr?.length) {
                  returnFilter({ branch_id: arr.join(", ") || "" });
                } else {
                  returnFilter({ branch_id: null });
                }
              }}
              apiUrl="/branch"
            />
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
