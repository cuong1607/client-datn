import { Tag } from "antd";
import { some } from "lodash";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleFavProduct } from "store/reducers/user";
import { ProductTypeList } from "types";
import { currencyFormat } from "utils";
const ProductItem = ({
  product_images,
  product_prices,
  id,
  name,
}: ProductTypeList) => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = React.useState<number>();
  const [maxnPrice, setMaxPrice] = React.useState<number>();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      })
    );
  };

  React.useEffect(() => {
    if (product_prices) {
      const minAmount = Math.min(
        ...product_prices.map((item: any) => parseInt(item.price)),
        ...product_prices.map((item: any) => parseInt(item.discount))
      );

      setMinPrice(minAmount);
      // Lấy ra số tiền lớn nhất trong price và discount
      const maxAmount = Math.max(
        ...product_prices.map((item: any) => parseInt(item.price)),
        ...product_prices.map((item: any) => parseInt(item.discount))
      );
      setMaxPrice(maxAmount);
    }
  }, [id]);
  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart"></i>
        </button>

        <Link className="hvr-float-shadow" href={`/product/${id}`}>
          <img
            style={{ objectFit: "contain" }}
            src={product_images.length ? product_images[0]?.path : ""}
            alt="productItem"
          />
          {minPrice && (
            <span className="product__discount">
              {currencyFormat(minPrice)} VNĐ
            </span>
          )}
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={
            "product__price " + (minPrice ? "product__price--discount" : "")
          }
        >
          <h4>{currencyFormat(Number(minPrice))} VNĐ</h4>

          {currencyFormat(Number(minPrice)) && (
            <span style={{ textDecoration: "line-through" }}>
              ${currencyFormat(Number(maxnPrice))}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        {product_prices?.map((item: any) => {
          return (
            <Tag
              style={
                item?.code === "#ffffff"
                  ? { color: "black", background: "#dab3b3f" }
                  : item?.code === "#000000"
                  ? { color: "white", border: "1px solid #000000" }
                  : {}
              }
              color={item?.code}
            >
              {item?.color}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
