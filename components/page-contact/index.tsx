import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";
import React from "react";
SwiperCore.use([Autoplay, Navigation, Pagination, Mousewheel, Keyboard]);

const PageContact = () => {
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
            style={{ backgroundImage: "url('/images/anh6.jpg')" }}
          >
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Lời cảm ơn...</h2>
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
            style={{ backgroundImage: "url('/images/anh7.jpg')" }}
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
                <h2>Cảm ơn quý khách...</h2>
                <a href="#" className="btn-shop">
                  <i className="icon-right"></i>Mua ngay
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </section>
  );
};

export default PageContact;
