import { Col, Form, Row } from 'react-bootstrap';
import './App.css';
import { atom, useRecoilState } from 'recoil';
import { Direction, DirectionType, Sort, SortType, stringToDirectionType, stringToSortType } from './components/solvedac';


// Atom Start
const memberState = atom<string>({
  key: 'member',
  default: ''
})

const searhTagState = atom<string>({
  key: 'searchTag',
  default: ''
})

const amountBronzeState = atom<number>({
  key: 'amountBronze',
  default: 0
});

const amountSilverState = atom<number>({
  key: 'amountSilver',
  default: 0
});

const amountGoldState = atom<number>({
  key: 'amountGold',
  default: 0
});

const amountPlatinumState = atom<number>({
  key: 'amountPlatinum',
  default: 0
});

const amountDiamondState = atom<number>({
  key: 'amountDiamond',
  default: 0
});

const amountRubyState = atom<number>({
  key: 'amountRuby',
  default: 0
});

const sortOptionState = atom<SortType>({
  key: 'sortOption',
  default: Sort.level
});

const directionOptionState = atom<DirectionType>({
  key: 'directionOption',
  default: Direction.desc
});
// Atom End


function SearchForm() {

  // amount by level
  const [amountBronze, setAmountBronze] = useRecoilState(amountBronzeState);
  const [amountSilver, setAmountSilver] = useRecoilState(amountSilverState);
  const [amountGold, setAmountGold] = useRecoilState(amountGoldState);
  const [amountPlatinum, setAmountPlatinum] = useRecoilState(amountPlatinumState);
  const [amountDiamond, setAmountDiamond] = useRecoilState(amountDiamondState);
  const [amountRuby, setAmountRuby] = useRecoilState(amountRubyState);

  const onChangeAmountBronze = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountBronze(Number(event.currentTarget.value));
  }

  const onChangeAmountSilver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSilver(Number(event.currentTarget.value));
  }

  const onChangeAmountGold = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountGold(Number(event.currentTarget.value));
  }

  const onChangeAmountPlatinum = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPlatinum(Number(event.currentTarget.value));
  }

  const onChangeAmountDiamond = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountDiamond(Number(event.currentTarget.value));
  }

  const onChangeAmountRuby = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRuby(Number(event.currentTarget.value));
  }

  // search option
  const [sortOption, setSortOption] = useRecoilState(sortOptionState);
  const [directionOption, setDirectionOption] = useRecoilState(directionOptionState);

  const onChangeSortOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(stringToSortType(event.currentTarget.value));
  }

  const onChangeDirectionOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDirectionOption(stringToDirectionType(event.currentTarget.value));
  }

  return (
    <Form>
      <Form.Group className='mb-3' controlId='fromGroupMember'>
        <Form.Label>{'멤버 목록 (띄어쓰기로 구분)'}</Form.Label>
        <Form.Control as='textarea' rows={3} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='amountByLeve'>
        <Row>
          <Col>
            <Form.Label>amountBronze</Form.Label>
            <Form.Control value={amountBronze} onChange={onChangeAmountBronze} /></Col>
          <Col>
            <Form.Label>amountSilver</Form.Label>
            <Form.Control value={amountSilver} onChange={onChangeAmountSilver} /></Col>
          <Col>
            <Form.Label>amountGold</Form.Label>
            <Form.Control value={amountGold} onChange={onChangeAmountGold} /></Col>
          <Col>
            <Form.Label>amountPlatinum</Form.Label>
            <Form.Control value={amountPlatinum} onChange={onChangeAmountPlatinum} /></Col>
          <Col>
            <Form.Label>amountDiamond</Form.Label>
            <Form.Control value={amountDiamond} onChange={onChangeAmountDiamond} /></Col>
          <Col>
            <Form.Label>amountRuby</Form.Label>
            <Form.Control value={amountRuby} onChange={onChangeAmountRuby} /></Col>
        </Row>
      </Form.Group>

      <Form.Group className='mb-3' controlId='searchOption'>
        <Row>
          <Col>
            <Form.Select defaultValue={sortOption} onChange={onChangeSortOption}>
              <option value={Sort.id}>id</option>
              <option value={Sort.level}>level</option>
              <option value={Sort.title}>title</option>
              <option value={Sort.average_try}>average_try</option>
              <option value={Sort.random}>random</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select defaultValue={directionOption} onChange={onChangeDirectionOption}>
              <option value={Direction.asc}>asc</option>
              <option value={Direction.desc}>desc</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    </Form>
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
