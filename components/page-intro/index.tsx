import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination, Mousewheel, Keyboard]);

const PageIntro = () => {
  return (
    <section className="page-intro">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/anh1.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Giảm giá mùa hè...</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right"></i>Mua ngay
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/slide-2.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Thương hiệu kính mắt của sự tinh tế</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right"></i>Mua ngay
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="page-intro__slide"
            style={{ backgroundImage: "url('/images/anh3.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Giảm giá mùa hè...</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right"></i>Mua ngay
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Miễn phí vận chuyển</h4>
                <p>Khi đơn hàng trên 199K</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% khách hàng hài lòng</h4>
                <p>Đây là phản hồi của khách hàng chúng tôi</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Bảo hành</h4>
                <p>
                  Bảo hành 30 ngày cho mỗi sản phẩm từ cửa hàng của chúng tôi
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
