import { useSelector } from "react-redux";
import { RootState } from "store";
import CheckoutStatus from "../../components/checkout-status";
import Item from "./item";
import { currencyFormat } from "utils";
const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += Number(item.price) * item.amount));
    }

    return currencyFormat(totalPrice);
  };
  console.log("cartItems", cartItems);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Giỏ hàng</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Sản phẩm</th>
                  <th>Màu sắc</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>

                {cartItems.map((item) => (
                  <Item
                    product_images={item?.product_images}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    amount={item.amount}
                  />
                ))}
              </tbody>
            </table>
          )}

          {cartItems.length === 0 && <p>Không có sản phẩm trong giỏ hàng!</p>}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Tiếp tục mua hàng
          </a>
          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Tổng tiền <strong>{priceTotal()}VNĐ</strong>
            </p>
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow">
              Thanh toán
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
