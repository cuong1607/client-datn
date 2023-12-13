import { ProductTypeList } from "types";
import ProductItem from "./../../product-item";
import React from "react";
// import Swiper core and required components
import { useEffect, useState } from "react";
import { currencyFormat } from "utils";

type ProductsCarouselType = {
  products: ProductTypeList[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [centeredSlides, setCenteredSlides] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(30);
  console.log(slidesPerView, centeredSlides, spaceBetween);
  useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  function updateWindowSize() {
    if (window.innerWidth > 768) {
      setSlidesPerView(3);
      setSpaceBetween(35);
      setCenteredSlides(false);
    } else if (window.innerWidth > 1024) {
      setSlidesPerView(4);
      setSpaceBetween(65);
      setCenteredSlides(false);
    } else {
      setSlidesPerView(2);
      setSpaceBetween(30);
      setCenteredSlides(false);
    }
  }

  if (!products) return <div>Loading</div>;
  console.log("products", products);
  // React.useEffect(() => {}, [products]);
  return (
    <div className="products-carousel">
      {products?.map(
        (item) => (
          console.log("itemitemitemitem", item),
          (
            <ProductItem
              id={item.id}
              name={item.name}
              price={currencyFormat(Number(item.price))}
              color={item.color}
              discount={item.discount}
              currentPrice={currencyFormat(item.currentPrice)}
              key={item.id}
              product_images={item.product_images?.[0]?.path}
            />
          )
        )
      )}
    </div>
  );
};

export default ProductsCarousel;
