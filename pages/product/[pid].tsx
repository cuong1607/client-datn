import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Gallery from "../../components/product-single/gallery";
import ProductsFeatured from "../../components/products-featured";
import Layout from "../../layouts/Main";
// types
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ProductService } from "utils/service/product";

const Product = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;
  const { data: productDetail } = useQuery<any>(["detail", pid], () =>
    ProductService.getDetail(Number(pid))
  );
  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={productDetail?.data?.product_images} />
            <Content product={productDetail?.data} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" className={`btn btn--rounded `}>
                Mô tả sản phẩm
              </button>
            </div>

            <Description />
          </div>
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
