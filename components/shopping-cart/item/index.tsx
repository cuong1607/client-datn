import { useDispatch } from "react-redux";
import { removeProduct, setCount } from "store/reducers/cart";
import { ProductStoreType } from "types";
import { currencyFormat } from "utils";

const ShoppingCart = ({
  product_images,
  name,
  id,
  color,
  amount,
  price,
}: ProductStoreType) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(
      removeProduct({
        product_images,
        name,
        id,
        color,
        amount,
        price,
      })
    );
  };

  const setProductCount = (amount: number) => {
    if (amount <= 0) {
      return;
    }

    const payload = {
      product: {
        product_images,
        name,
        id,
        color,
        amount,
        price,
      },
      amount,
    };

    dispatch(setCount(payload));
  };
  console.log("product_images0", product_images);

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={product_images?.[0]?.path} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">
        {color}
      </td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => setProductCount(amount - 1)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{amount}</span>
          <button
            type="button"
            onClick={() => setProductCount(amount + 1)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>{currencyFormat(Number(price))}VNĐ</td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => removeFromCart()}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
