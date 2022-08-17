import { Col, Container, Row } from 'react-bootstrap';
import './App.css';

import { MemberForm } from './components/memberform';
import { AmountForm } from './components/amountform';
import { SearchOption } from './components/searchoption';
import { SearchResult } from './components/searchresult';
import { TagForm } from './components/tagfrom';


function SearchForm() {
  return (
    <Container className='m-auto'>
      <Col>
        <Row xs={1} md={2} lg={2} className="mt-3 mb-3">
          <Col><MemberForm /></Col>
          <Col><TagForm /></Col>
        </Row>
        <Row><Col><AmountForm /></Col></Row>
        <Row><Col><SearchOption /></Col></Row>
      </Col>
      <SearchResult />
    </Container>
  )
}

function App() {
  return (
    <div className="App">
      <SearchForm></SearchForm>
    </div>
  );
}

export default App;
