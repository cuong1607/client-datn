import Logo from "../../assets/icons/logo";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <Logo /> <span>M</span>-MẮT KÍNH CỘNG ĐỒNG
            </h6>
            <p>Kính mắt cộng đồng - Mang tầm nhìn đến vẻ đẹp không gian</p>
            <ul className="site-footer__social-networks">
              <li>
                <a href="#">
                  <i className="icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-youtube-play"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Mua sắm online</li>
              <li>
                <a href="#">Trạng thái mua hàng</a>
              </li>
              <li>
                <a href="#">Vận chuyển và giao hàng</a>
              </li>
              <li>
                <a href="#">Trả lại</a>
              </li>
              <li>
                <a href="#">Các lựa chọn thanh toán</a>
              </li>
              <li>
                <a href="#">Liên hệ chúng tôi</a>
              </li>
            </ul>
            <ul>
              <li>Thông tin</li>
              <li>
                <a href="#">Thẻ quà tặng</a>
              </li>
              <li>
                <a href="#">Bản tin</a>
              </li>
              <li>
                <a href="#">Trở thành một thành viên</a>
              </li>
              <li>
                <a href="#">Phản hồi về trang web</a>
              </li>
            </ul>
            <ul>
              <li>LIÊN HỆ</li>
              <li>
                <a href="#">matkinhcongdong@gmail.com</a>
              </li>
              <li>
                <a href="#">Hotline: 0378 079 461</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>MAT KINH CONG DONG - © 2023. CỬA SỔ CHO PHONG CÁCH VÀ TẦM NHÌN.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
