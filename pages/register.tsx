import Layout from "../layouts/Main";
import Link from "next/link";

const RegisterPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <i className="icon-left"></i>Quay lại cửa hàng
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">
            Đăng ký tài khoản
          </h2>

          <form className="form">
            <div className="form__input-row">
              <input
                className="form__input"
                placeholder="Tên người dùng"
                type="text"
              />
            </div>

            {/* <div className="form__input-row">
              <input
                className="form__input"
                placeholder="Last Name"
                type="text"
              />
            </div> */}

            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="text" />
            </div>

            <div className="form__input-row">
              <input
                className="form__input"
                type="Password"
                placeholder="Password"
              />
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label
                  htmlFor="check-signed-in"
                  className={`checkbox checkbox--sm`}
                >
                  <input
                    name="signed-in"
                    type="checkbox"
                    id="check-signed-in"
                  />
                  <span className="checkbox__check"></span>
                  <p>
                    Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của trang web
                  </p>
                </label>
              </div>
            </div>

            <button
              type="button"
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

export default RegisterPage;
