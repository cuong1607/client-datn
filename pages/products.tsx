import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsFilter from "../components/products-filter";
import ProductsContent from "../components/products-content";
import { useQuery } from "react-query";
import { ProductService } from "../utils/service/product";
import React from "react";
const initialFilterQuery = {};

const Products = () => {
  const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
  const [page, setPage] = React.useState(1);
  const { data: product, refetch } = useQuery<any>(
    ["product", filterQuery, page],
    () =>
      ProductService.get({
        page: page,
        ...filterQuery,
      })
  );
  const returnFilter = React.useCallback(
    (filter: any) => {
      setPage(1);
      setFilterQuery({ ...filterQuery, ...filter });
    },
    [filterQuery]
  );
  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter returnFilter={returnFilter} />
          <ProductsContent returnFilter={returnFilter} product={product} />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
