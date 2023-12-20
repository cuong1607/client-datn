import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthService } from "../utils/service/auth";
import { Notification } from "utils";
import { useRouter } from "next/router";
import LocalStorage from "utils/LocalStorage";
import React from "react";

type FormValues = {
  phone: string;
  password: string;
  keepSigned?: boolean;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("router.asPath", router.asPath);

  React.useEffect(() => {
    if (LocalStorage.getToken()) {
      router.push("/");
    }
  }, []);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await AuthService.login({
      phone: data.phone,
      password: data.password,
    });
    if (res?.status) {
      LocalStorage.setToken(res?.data?.token);
      Notification("success", "Đăng nhập thành công");
      router.push("/");
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
            <h2 className="form-block__title">Đăng nhập</h2>

            <form className="form" onSubmit={handleSubmit(onSubmit as any)}>
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
                  type="password"
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
                      type="checkbox"
                      id="check-signed-in"
                      {...register("keepSigned", { required: false })}
                    />
                    <span className="checkbox__check"></span>
                    <p>Nhớ mật khẩu</p>
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="form__info__forgot-password"
                >
                  Quên tài khoản?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit hvr-glow"
              >
                Đăng nhập
              </button>

              <p className="form__signup-link">
                Bạn có tài khoản chưa? <a href="/register">Đăng ký</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
