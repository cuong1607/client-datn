import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import Subscribe from "../components/subscribe";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const priceTotal = useSelector(state);
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
