import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

type ForgotMail = {
  phone: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: ForgotMail) => {
    const res = await postData(`${server}/login`, {
      phone: data.phone,
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
            <h2 className="form-block__title">Quên mật khẩu?</h2>
            <p className="form-block__description">
              Vui lòng nhập số điện thoại!
            </p>

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
                    Vui lòng nhập số điện thoại!
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

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Lấy lại mật khẩu
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
