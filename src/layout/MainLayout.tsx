import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <React.Suspense>
        <Outlet />
      </React.Suspense>
      <Footer />
    </>
  );
};

export default MainLayout;
