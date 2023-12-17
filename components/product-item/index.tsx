import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "store/reducers/user";
import { RootState } from "store";
import { ProductStoreType, ProductTypeList } from "types";
import { addProduct } from "store/reducers/cart";
import { Notification } from "utils";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { Tag } from "antd";
const ProductItem = ({
  discount,
  product_images,
  product_prices,
  id,
  name,
  price,
  currentPrice,
  item,
}: ProductTypeList) => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = React.useState<number>(1);
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
  const addToCart = () => {
    const count = 1;
    const productToSave: ProductStoreType = {
      id: id,
      name: name,
      thumb: product_images ? product_images[0] : "",
      price: item.price,
      count: 1,
      color: item.color,
      size: item.itemSize,
    };

    const productStore = {
      count,
      product: productToSave,
    };
    dispatch(addProduct(productStore));
    Notification("success", "Thêm sản phẩm vào giỏ hàng thành công");
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
  }, [item]);
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
            <span className="product__discount">{minPrice} VNĐ</span>
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
          <h4>{minPrice} VNĐ</h4>

          {minPrice && (
            <span style={{ textDecoration: "line-through" }}>${maxnPrice}</span>
          )}
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        {product_prices?.map((item: any) => {
          console.log("product_prices", item);
          return <Tag style={item?.code === '#ffffff' ? {color: 'black', background: '#dab3b3f'} : item?.code === '#000000' ? {color: 'white', border: '1px solid #000000'} : {}} color={item?.code}>{item?.color}</Tag>;
        })}
      </div>
    </div>
  );
};

export default ProductItem;
