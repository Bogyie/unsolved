import { Form } from 'react-bootstrap';
import './App.css';

import { MemberForm } from './components/memberform';
import { AmountForm } from './components/amountform';
import { SearchOption } from './components/searchoption';
import { SearchResult } from './components/searchresult';


function SearchForm() {
  return (
    <>
      <Form>
        <MemberForm />
        <AmountForm />
        <SearchOption />
      </Form>
      <SearchResult />
    </>
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
