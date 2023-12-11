import { GetServerSideProps } from "next";

import { useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
// types
import { ProductType } from "types";
import { ProductService } from "utils/service/product";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
type ProductPageType = {
  product: ProductType;
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const pid = query.pid;
// const { data: productDetail } = useQuery<any>(["detail"], () =>
//   ProductService.getDetail(Number(pid))
// );
//   return {
//     props: {
//       productDetail,
//     },
//   };
// };

const Product = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;
  const { data: productDetail } = useQuery<any>(["detail", pid], () =>
    ProductService.getDetail(Number(pid))
  );
  console.log("pid", pid);
  const [showBlock, setShowBlock] = useState("description");
  console.log("getDetail", productDetail);
  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={productDetail?.data?.product_images} />
            <Content product={productDetail?.data} />
          </div>

          {/* <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button>
            </div>

            <Description show={showBlock === "description"} />
            <Reviews
              product={productDetail?.data}
              show={showBlock === "reviews"}
            />
          </div> */}
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
