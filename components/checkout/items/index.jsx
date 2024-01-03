import { useSelector } from 'react-redux';
import { currencyFormat } from 'utils';

const CheckoutItems = () => {
  const { cartItems } = useSelector(state => state.cart);
  return (
    <ul className="checkout-items">
      {cartItems.map((item, index) => (
        <li key={index} className="checkout-item">
          <div className="checkout-item__content">
            <div className="checkout-item__img">
              <img src={item.product_images[0].path} />
            </div>

            <div className="checkout-item__data">
              <h3>{item.name}</h3>
              <p>Số lượng: {item.amount}</p>
              <span>#{item.id}</span>
            </div>
          </div>
          <h3>{currencyFormat(item.price)}VNĐ</h3>
        </li>
      ))}
    </ul>
  )
};

  
export default CheckoutItems