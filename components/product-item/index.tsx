import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "store/reducers/user";
import { RootState } from "store";
import { ProductStoreType, ProductTypeList } from "types";
import { addProduct } from "store/reducers/cart";

const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
  item
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
      thumb: images ? images[0] : '',
      price: item.currentPrice,
      count: 1,
      color: item.color,
      size: item.itemSize
    }

    const productStore = {
      count,
      product: productToSave
    }
    dispatch(addProduct(productStore));
    alert('Thêm sản phẩm vào giỏ hàng thành công')
  }

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
            src={images ? images[0] : ""}
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
          <h4>${currentPrice}</h4>

          {discount && (
            <span style={{ textDecoration: "line-through" }}>${price}</span>
          )}
        </div>
      </div>

      <div className="product__button__add">
        <button type="button" onClick={addToCart} className="hvr-grow-shadow product__button">
          <i className="icon-cart"></i>
        </button>
        <div>
          <button type="button" className="hvr-grow-shadow product__button">
            <i className="icon-search"></i>
          </button>
          </div>
      </div>
    </div>
  );
};

export default ProductItem;
