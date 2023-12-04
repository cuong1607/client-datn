import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

type FormValues = {
  email: string;
  password: string;
  keepSigned?: boolean;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password,
    });

    console.log(res);
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
                  placeholder="Ex: 0987654321"
                  type="text"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    Vui lòng nhập tên đăng nhập!
                  </p>
                )}

                {/* {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Vui lòng nhập đúng định dạng cho Email
                  </p>
                )} */}
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

              <div className="form__btns">
                <button type="button" className="btn-social fb-btn hvr-glow">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button
                  type="button"
                  className="btn-social google-btn hvr-glow"
                >
                  <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                </button>
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
