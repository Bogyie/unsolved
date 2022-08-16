import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './App.css';
import { atom, useRecoilState } from 'recoil';
import { 
  Direction, DirectionType, Level, 
  numberToLevel, ProblemDto, SolvedacApi, 
  Sort, SortType, stringToDirectionType, 
  stringToSortType 
} from './components/solvedac';
import React from 'react';


// Atom Start

// member
const memberState = atom<string>({
  key: 'member',
  default: ''
})

// amount
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

// search options
const searchTagState = atom<string>({
  key: 'searchTag',
  default: ''
})

const sortOptionState = atom<SortType>({
  key: 'sortOption',
  default: Sort.level
});

const directionOptionState = atom<DirectionType>({
  key: 'directionOption',
  default: Direction.desc
});

// search result
const bronzeSearchState = atom<ProblemDto[]>({
  key: 'bronzeSearch',
  default: []
});

const silverSearchState = atom<ProblemDto[]>({
  key: 'silverSearch',
  default: []
});

const goldSearchState = atom<ProblemDto[]>({
  key: 'goldSearch',
  default: []
});

const platinumSearchState = atom<ProblemDto[]>({
  key: 'platinumSearch',
  default: []
});

const diamondSearchState = atom<ProblemDto[]>({
  key: 'diamondSearch',
  default: []
});

const rubySearchState = atom<ProblemDto[]>({
  key: 'rubySearch',
  default: []
});

// search element
const bronzeElementState = atom<JSX.Element[]>({
  key: 'bronzeElement',
  default: []
});

const silverElementState = atom<JSX.Element[]>({
  key: 'silverElement',
  default: []
});

const goldElementState = atom<JSX.Element[]>({
  key: 'goldElement',
  default: []
});

const platinumElementState = atom<JSX.Element[]>({
  key: 'platinumElement',
  default: []
});

const diamondElementState = atom<JSX.Element[]>({
  key: 'diamondElement',
  default: []
});

const rubyElementState = atom<JSX.Element[]>({
  key: 'rubyElement',
  default: []
});
// Atom End


function SearchForm() {
  const solvedacApi = new SolvedacApi();

  // member
  const [member, setMember] = useRecoilState(memberState);

  const onChangeMamber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember(event.currentTarget.value);
  }

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
  const [searchTag, setSearchTag] = useRecoilState(searchTagState);
  const [sortOption, setSortOption] = useRecoilState(sortOptionState);
  const [directionOption, setDirectionOption] = useRecoilState(directionOptionState);

  const onChangeSearchTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTag(event.currentTarget.value);
  }

  const onChangeSortOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(stringToSortType(event.currentTarget.value));
  }

  const onChangeDirectionOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDirectionOption(stringToDirectionType(event.currentTarget.value));
  }



  // search result
  const [bronzeSearch, setBronzeSearch] = useRecoilState(bronzeSearchState);
  const [silverSearch, setSilverSearch] = useRecoilState(silverSearchState);
  const [goldSearch, setGoldSearch] = useRecoilState(goldSearchState);
  const [platinumSearch, setPlatinumSearch] = useRecoilState(platinumSearchState);
  const [diamondSearch, setDiamondSearch] = useRecoilState(diamondSearchState);
  const [rubySearch, setRubySearch] = useRecoilState(rubySearchState);

  const [bronzeElement, setBronzeElement] = useRecoilState(bronzeElementState);
  const [silverElement, setSilverElement] = useRecoilState(silverElementState);
  const [goldElement, setGoldElement] = useRecoilState(goldElementState);
  const [platinumElement, setPlatinumElement] = useRecoilState(platinumElementState);
  const [diamondElement, setDiamondElement] = useRecoilState(diamondElementState);
  const [rubyElement, setRubyElement] = useRecoilState(rubyElementState);

  const testProblem = {
    problemId: 13705,
    titleKo: "Ax+Bsin(x)=C",
    isSolvable: true,
    isPartial: false,
    acceptedUserCount: 189,
    level: numberToLevel(0),
    votedUserCount: 62,
    isLevelLocked: false,
    averageTries: 28.8413
  };

  const problemToComponent = (problem: ProblemDto) => {
    return (
      <Row>
        <Col>{problem.titleKo}</Col>
        <Col>{problem.problemId}</Col>
      </Row>
    )
  }

  let solvedProblem = new Set<ProblemDto>();

  const updateSolvedProblem = async () => {
    const solved = await solvedacApi.searchSolvedProblemByGroup(member.split(" |\\n"));

    if (amountBronze > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountBronze, Level.Bronze, Level.Bronze, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setBronzeElement(result);
      });
    }

    if (amountSilver > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountSilver, Level.Silver, Level.Silver, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setSilverElement(result);
      });
    }

    if (amountGold > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountGold, Level.Gold, Level.Gold, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setGoldElement(result);
      });
    }

    if (amountPlatinum > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountPlatinum, Level.Platinum, Level.Platinum, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setPlatinumElement(result);
      });
    }

    if (amountDiamond > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountDiamond, Level.Diamond, Level.Diamond, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setDiamondElement(result);
      });
    }

    if (amountRuby > 0) {
      solvedacApi.searchUnsolvedProblemByLevel(
        solved, amountRuby, Level.Ruby, Level.Ruby, directionOption, sortOption).then((problems) => {
        const result: JSX.Element[] = [];
        problems.forEach((problem) => result.push(problemToComponent(problem)));
        setRubyElement(result);
      });
    }
  }

  return (
    <>
      <Form>

        <Form.Group className='mb-3' controlId='fromGroupMember'>
          <Form.Label>{'멤버 목록 (띄어쓰기로 구분)'}</Form.Label>
          <Form.Control as='textarea' rows={3} value={member} onChange={onChangeMamber} />
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
            <Form.Label>{`검색 태그`}</Form.Label>
            <Form.Control value={searchTag} onChange={onChangeSearchTag} />
          </Row>
          <Row>
            <Col>
              <Form.Label>{`정렬 기준`}</Form.Label>
              <Form.Select defaultValue={sortOption} onChange={onChangeSortOption}>
                <option value={Sort.id}>id</option>
                <option value={Sort.level}>level</option>
                <option value={Sort.title}>title</option>
                <option value={Sort.average_try}>average_try</option>
                <option value={Sort.random}>random</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>{`정렬 방법`}</Form.Label>
              <Form.Select defaultValue={directionOption} onChange={onChangeDirectionOption}>
                <option value={Direction.asc}>asc</option>
                <option value={Direction.desc}>desc</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

      </Form>

      <Button onClick={updateSolvedProblem}>update</Button>

      <Container>
        <Card>
          <Card.Header>bronze</Card.Header>
          <Card.Body>
            {bronzeElement}
          </Card.Body>

        </Card>
        <Card>
          <Card.Header>silver</Card.Header>
          <Card.Body>
            {silverElement}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>gold</Card.Header>
          <Card.Body>
            {goldElement}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>platinum</Card.Header>
          <Card.Body>
            {platinumElement}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>diamond</Card.Header>
          <Card.Body>
            {diamondElement}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>ruby</Card.Header>
          <Card.Body>
            {rubyElement}
          </Card.Body>
        </Card>
      </Container>
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
