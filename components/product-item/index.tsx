import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "store/reducers/user";
import { RootState } from "store";
import { ProductStoreType, ProductTypeList } from "types";
import { addProduct } from "store/reducers/cart";
import { Notification, currencyFormat } from "utils";
import { ShoppingCartOutlined } from "@ant-design/icons";
const ProductItem = ({
  discount,
  product_images,
  id,
  name,
  price,
  currentPrice,
  item,
}: ProductTypeList) => {
  const dispatch = useDispatch();
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
            src={product_images ? product_images[0] : ""}
            alt="product"
          />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={
            "product__price " + (discount ? "product__price--discount" : "")
          }
        >
          <h4>{price} VNĐ</h4>

          {discount && (
            <span style={{ textDecoration: "line-through" }}>${price}</span>
          )}
        </div>
      </div>

      <div className="product__button__add">
        <button type="button" onClick={addToCart} className="product__button">
          <p>
            <ShoppingCartOutlined />{" "}
            <span style={{ fontSize: "14px" }}>Thêm vào giỏ hàng</span>
          </p>
        </button>
        {/* <div>
          <button type="button" className="product__button">
            <i className="icon-search"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductItem;
