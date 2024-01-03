import Layout from "../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { RootState } from "store";
import { Notification, currencyFormat } from "utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddressService } from "../../utils/service/address";
import { useQuery } from "react-query";
import { IDataOrder, IProduct, OrderService } from "../../utils/service/order";
import { useRouter } from "next/router";
import { removeProductAll } from "store/reducers/cart";
import LocalStorage from "utils/LocalStorage";

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += Number(item.price) * item.amount));
    }
    return totalPrice;
  });
  const cartItems = useSelector((state: RootState) => {
    const cartItem: IProduct[] = state.cart.cartItems?.map((item: any) => {
      return {
        product_price_id: Number(item.id),
        quantity: Number(item.amount),
      };
    });

    return cartItem;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const selectedProvinceId = watch("df_province_id");
  const selectedDistrictId = watch("df_district_id");
  const { data: province } = useQuery<any>(["province"], () =>
    AddressService.getProvince()
  );

  const { data: district } = useQuery<any>(
    ["district", selectedProvinceId],
    () => AddressService.getDistrict(selectedProvinceId)
  );
  const { data: ward } = useQuery<any>(["ward", selectedDistrictId], () =>
    AddressService.getWard(selectedDistrictId)
  );
  const onSubmit: SubmitHandler<IDataOrder> = async (data) => {
    const res = await OrderService.order({
      ...data,
      list_product: cartItems,
    });
    if (res?.status) {
      Notification("success", "Mua hàng thành công");
      dispatch(removeProductAll());
      router.push("/");
    }
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
                {/* {LocalStorage.getToken() ? (
                  <></>
                ) : (
                 
                )} */}
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
                        {...register("phone_number", {
                          required: true,
                          pattern: /^\d{10}$/,
                        })}
                      />
                      {errors.phone_number &&
                        errors.phone_number.type === "required" && (
                          <p className="message message--error">
                            Vui lòng nhập số điện thoại!
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <select
                        className="form__input form__input--sm"
                        {...register("df_province_id", { required: true })}
                      >
                        <option value="" disabled selected>
                          Chọn Tỉnh/Thành phố
                        </option>
                        {province?.data?.map(
                          (province: { id: number; name: string }) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          )
                        )}
                      </select>
                      {errors.df_province_id &&
                        errors.df_province_id.type === "required" && (
                          <p className="message message--error">
                            Vui lòng chọn tỉnh/thành phố!
                          </p>
                        )}
                    </div>

                    <div className="form__col">
                      <select
                        className="form__input form__input--sm"
                        placeholder="Chọn Quận/Huyện"
                        {...register("df_district_id", { required: true })}
                      >
                        <option value="" disabled selected>
                          Chọn Quận/Huyện
                        </option>
                        {district?.data?.map(
                          (province: { id: number; name: string }) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          )
                        )}
                      </select>
                      {errors.df_district_id &&
                        errors.df_district_id.type === "required" && (
                          <p className="message message--error">
                            Vui lòng chọn Quận/huyện!
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <select
                        className="form__input form__input--sm"
                        placeholder="Chọn Xã Phường"
                        {...register("df_ward_id", { required: true })}
                      >
                        <option value="" disabled selected>
                          Chọn Xã/Phường
                        </option>
                        {ward?.data?.map(
                          (province: { id: number; name: string }) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          )
                        )}
                      </select>
                      {errors.df_ward_id &&
                        errors.df_ward_id.type === "required" && (
                          <p className="message message--error">
                            Vui lòng chọn Xã/Phường!
                          </p>
                        )}
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Địa chỉ chi tiết VD: Số nhà, ngõ, ...."
                        {...register("address", { required: true })}
                      />
                      {errors.address && errors.address.type === "required" && (
                        <p className="message message--error">
                          Vui lòng nhập địa chỉ chi tiết!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout__col-3">
                <div className="block">
                  <h3 className="block__title">Hình thức thanh toán</h3>
                  <select
                    className="form__input form__input--sm"
                    placeholder="Chọn hình thức thanh toán"
                    {...register("payment_method", { required: true })}
                  >
                    <option value="1">Thanh toán khi nhận hàng</option>
                    <option value="2">Chuyển khoản</option>
                  </select>
                  {errors.payment_method &&
                    errors.payment_method.type === "required" && (
                      <p className="message message--error">
                        Vui lòng chọn hình thức thanh toán!
                      </p>
                    )}
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
