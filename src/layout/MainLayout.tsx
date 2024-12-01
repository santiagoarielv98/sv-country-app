import React from "react";
import { Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="my-3 flex-fill" as="main">
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
