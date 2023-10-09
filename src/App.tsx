import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import GlobeAmericas from "./components/icons/GlobeAmericas";
import Moon from "./components/icons/Moon";
import Search from "./components/icons/Search";
import Dropdown from "react-bootstrap/esm/Dropdown";
import React from "react";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "", label: "All" },
  { value: "Africa", label: "Africa" },
  { value: "America", label: "America" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const App = () => {
  const [filter, setFilter] = React.useState(options[0]);

  const handleChange = (option: Option) => {
    setFilter(option);
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary shadow sticky-top">
        <Container>
          <Navbar.Brand href="#">
            <GlobeAmericas width="50" height="50" />
            <Navbar.Text className="ms-2">SV # World</Navbar.Text>
          </Navbar.Brand>
          <Button className="d-inline-flex">
            <Moon width="24" height="24" />
            <span className="ms-3">Dark Mode</span>
          </Button>
        </Container>
      </Navbar>
      {/* Search for a country      dropdown region filter */}
      <Container>
        <Row className="my-3 justify-content-between">
          <Col>
            <div className="position-relative">
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                <Search width="20" height="20" />
              </div>
              <Form.Control
                className="ps-5"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">{filter.value || "Filter by Region"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {options.map((option) => (
                  <Dropdown.Item key={option.value} onClick={() => handleChange(option)} as="button">
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
