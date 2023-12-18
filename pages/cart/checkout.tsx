import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { RootState } from "store";
import { Select } from "antd";
import { currencyFormat } from "utils";
import { SubmitHandler, useForm } from "react-hook-form";

const CheckoutPage = () => {
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += Number(item.price) * item.amount));
    }

    return totalPrice;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const res = await AuthService.login({
    //   phone: data.phone,
    //   password: data.password,
    // });
    // if (res?.status) {
    //   LocalStorage.setToken(res?.data?.token);
    //   Notification("success", "Đăng nhập thành công");
    //   router.push("/");
    // }
  };
  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <form className="form" onSubmit={handleSubmit(onSubmit as any)}>
            <div className="cart__intro">
              <h3 className="cart__title">Vận chuyển và thanh toán</h3>
              <CheckoutStatus step="checkout" />
            </div>

            <div className="checkout-content">
              <div className="checkout__col-6">
                <div className="checkout__btns">
                  <button className="btn btn--rounded btn--yellow">
                    Đăng nhập
                  </button>
                  <button className="btn btn--rounded btn--border">
                    Đăng ký
                  </button>
                </div>

                <div className="block">
                  <h3 className="block__title">Thông tin nhận hàng</h3>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Tên người nhận"
                        {...register("name", { required: true })}
                      />
                      {errors.name && errors.name.type === "required" && (
                        <p className="message message--error">
                          Vui lòng nhập tên người nhận!
                        </p>
                      )}
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Số điện thoại"
                        {...register("phone", {
                          required: true,
                          pattern: /^\d{10}$/,
                        })}
                      />
                      {errors.phone && errors.phone.type === "required" && (
                        <p className="message message--error">
                          Vui lòng nhập số điện thoại!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Tỉnh/Thành phố"
                        {...register("tinh", { required: true })}
                      />
                      {errors.tinh && errors.tinh.type === "required" && (
                        <p className="message message--error">
                          Vui lòng chọn tỉnh/thành phố!
                        </p>
                      )}
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Quận/Huyện"
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Xã Phường"
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Địa chỉ chi tiết"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout__col-3">
                <div className="block">
                  <h3 className="block__title">Hình thức thanh toán</h3>
                  <Select
                    defaultValue="1"
                    style={{ width: 250 }}
                    options={[
                      { value: "1", label: "Thanh toán khi nhận hàng" },
                      { value: "2", label: "Chuyển khoản" },
                    ]}
                  />
                </div>
              </div>

              <div className="checkout__col-4">
                <div className="block">
                  <h3 className="block__title">Đơn hàng của bạn</h3>
                  <CheckoutItems />

                  <div className="checkout-total">
                    <p>Tổng tiền</p>
                    <h3>{currencyFormat(priceTotal)}VNĐ</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-actions cart-actions--checkout">
              <a href="/cart" className="cart__btn-back">
                <i className="icon-left"></i> Quay lại
              </a>
              <div className="cart-actions__items-wrapper">
                <button type="button" className="btn btn--rounded btn--border">
                  Tiếp tục mua sắm
                </button>
                <button type="submit" className="btn btn--rounded btn--yellow">
                  Tiến hành đặt hàng
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
