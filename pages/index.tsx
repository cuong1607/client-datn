import Footer from "../components/footer";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Subscribe from "../components/subscribe";
import Layout from "../layouts/Main";

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />
      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
