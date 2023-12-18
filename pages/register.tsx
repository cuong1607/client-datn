import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../layouts/Main";
import Link from "next/link";
import { AuthService } from "../utils/service/auth";
import { Notification } from "utils";
import { useRouter } from "next/router";
type FormValues = {
  full_name: string;
  phone: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await AuthService.register({
      full_name: data?.full_name,
      phone: data?.phone,
      email: data?.email,
      password: data?.password,
    });
    if (res?.status) {
      Notification("success", "Đăng ký thành công");
      router.push("/login");
    }
  };
  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left"></i>Quay lại cửa hàng
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Đăng ký tài khoản</h2>

            <form className="form" onSubmit={handleSubmit(onSubmit as any)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Tên người dùng"
                  type="text"
                  {...register("full_name", { required: true })}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Số điện thoại"
                  type="text"
                  {...register("phone", {
                    required: true,
                    pattern: /^\d{10}$/,
                  })}
                />
                {errors.phone && errors.phone.type === "required" && (
                  <p className="message message--error">
                    Vui lòng nhập số điện thoại đăng nhập!
                  </p>
                )}

                {errors.phone && errors.phone.type === "pattern" && (
                  <p className="message message--error">
                    Vui lòng nhập đúng định dạng cho Số điện thoại
                  </p>
                )}
              </div>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">Vui lòng nhập email!</p>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Vui lòng nhập đúng định dạng email!
                  </p>
                )}
              </div>
              <div className="form__input-row">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Mật khẩu"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="message message--error">
                    Vui lòng nhập mật khẩu!
                  </p>
                )}
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      // name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                      {...register("checkin", { required: true })}
                    />
                    <span className="checkbox__check"></span>
                    <p>
                      Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
                      của trang web
                    </p>
                  </label>
                  {errors.checkin && errors.checkin.type === "required" && (
                    <p className="message message--error">
                      Vui lòng đồng ý với điều khoản của trang web!
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit hvr-glow"
              >
                Đăng ký
              </button>

              <p className="form__signup-link">
                <Link href="/login">Bạn đã có tài khoản?</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
