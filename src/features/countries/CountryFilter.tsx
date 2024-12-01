import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import { Option, options } from "./options";

interface CountryFilterProps {
  filter: { value: string };
  handleChange: (option: Option) => void;
}

const CountryFilter = ({ filter, handleChange }: CountryFilterProps) => {
  return (
    <Col>
      <Dropdown className="d-flex justify-content-end">
        <Dropdown.Toggle id="dropdown-basic">{filter.value || "Filter by Region"}</Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item
              active={option.value === filter.value}
              key={option.value}
              onClick={() => handleChange(option)}
              as="button"
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default CountryFilter;
