import Layout from "../layouts/Main";
import Footer from "../components/footer";
import React from "react";
import PageContact from "components/page-contact";

const Contact = () => {
  return (
    <Layout>
      <PageContact />
      <section className="products-page" style={{ marginTop: "10px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src="/images/anh7.jpg"
              width={300}
              height={400}
              alt="Italian Trulli"
            />
            <img src="/images/anh9.jpg" width={300} alt="Italian Trulli" />
          </div>
          <div>
            <h2 style={{ fontSize: "28px" }}>
              CẢM ƠN VÌ BẠN ĐÃ LỰA CHỌN CHÚNG TÔI
            </h2>
          </div>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "28px" }}>
              HỆ THỐNG CỬA HÀNG MẮT KÍNH
            </h2>
          </div>
          <div>
            <img
              src="/images/anh8.jpg"
              width={600}
              height={600}
              alt="Italian Trulli"
            />
          </div>
        </div>

        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src="/images/anh10.jpg"
              width={600}
              height={600}
              alt="Italian Trulli"
            />
          </div>
          <div>
            <h2 style={{ fontSize: "28px" }}>
              CẢM ƠN VÌ BẠN ĐÃ LỰA CHỌN CHÚNG TÔI
            </h2>
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Contact;
