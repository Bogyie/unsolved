import { Container } from 'react-bootstrap';
import './App.css';
import { SearchCard } from './components/searchcard';


function App() {
  const SearchCardBlock = () => SearchCard(1);
  return (
    <Container>
      <SearchCardBlock/>
    </Container>
  );
}

export default App;
