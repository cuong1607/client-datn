import { useState } from "react";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";

// data
import { useQuery } from "react-query";
import { CategoryService, ConfigSetting } from "../../utils/service/category";
// import { Slider } from "antd";
import { SliderMarks } from "antd/es/slider";
import Slider from "rc-slider";
import { currencyFormat } from "utils";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const marks: SliderMarks = {
  0: "0Đ",
  5000000: {
    style: {
      color: "#f50",
    },
    label: <strong>5.000.000Đ</strong>,
  },
};
const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: category } = useQuery<any>(["CategoryService"], () =>
    CategoryService.get({ page: 1, limit: 999 })
  );
  const { data: color } = useQuery<any>(["color"], () =>
    ConfigSetting.getColor({ page: 1, limit: 999 })
  );
  const { data: size } = useQuery<any>(["size"], () =>
    ConfigSetting.getSize({ page: 1, limit: 999 })
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
          <button type="button">Giá tiền</button>
          <div className="products-filter__block__content">
            {/* <Range
              min={0}
              max={20}
              defaultValue={[3, 10]}
              tipFormatter={(value) => `${value}%`}
            /> */}
            <Range
              min={0}
              max={5000000}
              defaultValue={[50000, 1000000]}
              tipFormatter={(value) => `${currencyFormat(value)}đ`}
            />
            {/* <Slider
              range
              marks={marks}
              defaultValue={[0, 5000000]}
              min={0}
              max={5000000}
            /> */}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Kích thước</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {size?.data?.map((type: any) => (
              <Checkbox
                type="square"
                key={type.id}
                name="product-size"
                label={type.name}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Màu sắc</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {color?.data?.map((type: any) => (
                <CheckboxColor
                  key={type.id}
                  valueName={type.code}
                  name="product-color"
                  color={type.code}
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
