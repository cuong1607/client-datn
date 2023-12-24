import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import { ProductType, ProductStoreType } from "types";
import { RootState } from "store";
import { Notification, currencyFormat } from "utils";
import { Select } from "antd";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [amount, setCount] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxnPrice, setMaxPrice] = useState<number>();
  const [itemColor, setItemColor] = useState<number>();
  const [itemProduct, setItemProduct] = useState<any[]>();

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product?.id
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      })
    );
  };

  const addToCart = async () => {
    if (itemColor && itemProduct?.length) {
      // if (LocalStorage?.getToken()) {
      //   const productToSave: ProductStoreType = {
      //     id: itemProduct[0].id,
      //     name: product.name,
      //     product_images: product?.product_images,
      //     // product_prices: product?.product_prices,
      //     amount: amount,
      //     price: minPrice,
      //     color: itemProduct[0].color,
      //   };
      //   const productStore = {
      //     quantity: productToSave.amount,
      //     product_price_id: Number(productToSave.id),
      //   };
      //   await CartService.cart(productStore).then((res) => {
      //     if (res.status) {
      //       Notification("success", "Thêm vào giỏ hàng thành công");
      //     }
      //   });
      // } else {

      // }
      const productToSave: ProductStoreType = {
        id: itemProduct[0].id,
        name: product.name,
        product_images: product?.product_images,
        // product_prices: product?.product_prices,
        amount: amount,
        price: minPrice,
        color: itemProduct[0].color,
      };

      const productStore = {
        amount,
        product: productToSave,
      };
      console.log("productToSave", productToSave);

      dispatch(addProduct(productStore));
      Notification("success", "Thêm vào giỏ hàng thành công");
    } else {
      Notification("warning", "Vui lòng chọn màu sắc của sản phẩm");
    }
  };

  React.useEffect(() => {
    if (product?.product_prices) {
      const minAmount = Math.min(
        ...product?.product_prices.map((item) => parseInt(item.price)),
        ...product?.product_prices.map((item) => parseInt(item.discount))
      );
      setMinPrice(minAmount);
      // Lấy ra số tiền lớn nhất trong price và discount
      const maxAmount = Math.max(
        ...product?.product_prices.map((item) => parseInt(item.price)),
        ...product?.product_prices.map((item) => parseInt(item.discount))
      );
      setMaxPrice(maxAmount);
    }
  }, [product]);

  React.useEffect(() => {
    if (itemColor) {
      const discountColor: any = product?.product_prices?.filter(
        (item: any) => item.id === Number(itemColor)
      );
      setMinPrice(Number(discountColor[0].discount));
      setMaxPrice(Number(discountColor[0].price));
      setItemProduct(discountColor);
    }
  }, [itemColor]);

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <span className="product-on-sale">Giảm giá</span>
        <h2 className="product__name">{product?.name}</h2>

        <div className="product__prices">
          <h4 style={{ textDecorationLine: "line-through" }}>
            {currencyFormat(Number(maxnPrice))} VNĐ
          </h4>
          {minPrice && (
            <span style={{ color: "black" }}>
              {currencyFormat(Number(minPrice))} VNĐ
            </span>
          )}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>
            Màu sắc: <strong>Xem màu sắc</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <Select
                placeholder="Chọn màu sắc"
                style={{ width: 200 }}
                onChange={(value) => {
                  setItemColor(value);
                }}
                options={product?.product_prices?.map((it: any) => ({
                  value: it?.id,
                  label: it.color,
                }))}
              />
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Số lượng:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                disabled={amount === 1 ? true : false}
                type="button"
                onClick={() => setCount(amount - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{amount}</span>
              <button
                type="button"
                onClick={() => setCount(amount + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
            >
              <i className="icon-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
