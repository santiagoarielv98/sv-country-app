import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { Outlet } from "react-router-dom";
import { Theme } from "../app/theme";
import GlobeAmericas from "../components/icons/GlobeAmericas";
import Moon from "../components/icons/Moon";
import Sun from "../components/icons/Sun";

const initialTheme: Theme = localStorage.theme || Theme.LIGHT;

const Layout = () => {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      localStorage.theme = newTheme;
      return newTheme;
    });
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div>
      <Navbar className="bg-body-tertiary shadow sticky-top">
        <Container>
          <Navbar.Brand href="#">
            <GlobeAmericas width="50" height="50" />
            <Navbar.Text className="ms-2">SV # World</Navbar.Text>
          </Navbar.Brand>
          <Button className="d-inline-flex" onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <Sun width="24" height="24" /> : <Moon width="24" height="24" />}
            <span className="ms-3 text-capitalize">{theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT} Mode</span>
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
