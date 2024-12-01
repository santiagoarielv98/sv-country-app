import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Container } from "react-bootstrap";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="my-3 flex-fill">
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
