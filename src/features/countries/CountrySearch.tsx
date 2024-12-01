import Search from "@/components/icons/Search";
import { Col, Form, InputGroup } from "react-bootstrap";

interface CountrySearchProps {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CountrySearch = ({ search, handleSearch }: CountrySearchProps) => {
  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Text id="search-icon">
          <Search width="20" height="20" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={handleSearch}
          aria-label="Search for a country"
          aria-describedby="search-icon"
        />
      </InputGroup>
    </Col>
  );
};

export default CountrySearch;
