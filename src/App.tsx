import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './App.css';
import { useRecoilState, useRecoilValue, SetterOrUpdater } from 'recoil';

import {
  Direction, Level,
  LevelType,
  ProblemDto, SolvedacApi,
  Sort, stringToDirectionType,
  stringToSortType
} from './components/solvedac';

import {
  memberState,
  amountBronzeState, amountSilverState, amountGoldState,
  amountPlatinumState, amountDiamondState, amountRubyState,
  searchTagState, sortOptionState, directionOptionState,
  bronzeElementState, silverElementState, goldElementState,
  platinumElementState, diamondElementState, rubyElementState
} from './atoms';

import { MemberForm } from './components/memberform';
import { AmountForm } from './components/amountform';
import { SearchOption } from './components/searchoption';


function SearchForm() {
  const solvedacApi = new SolvedacApi();

  // member
  const member = useRecoilValue(memberState);

  // amount by level
  const amountBronze = useRecoilValue(amountBronzeState);    
  const amountSilver = useRecoilValue(amountSilverState);  
  const amountGold = useRecoilValue(amountGoldState);  
  const amountPlatinum = useRecoilValue(amountPlatinumState);  
  const amountDiamond = useRecoilValue(amountDiamondState);  
  const amountRuby = useRecoilValue(amountRubyState);

  // search option
  const searchTag = useRecoilValue(searchTagState);
  const sortOption = useRecoilValue(sortOptionState);
  const directionOption = useRecoilValue(directionOptionState);

  const [bronzeElement, setBronzeElement] = useRecoilState(bronzeElementState);
  const [silverElement, setSilverElement] = useRecoilState(silverElementState);
  const [goldElement, setGoldElement] = useRecoilState(goldElementState);
  const [platinumElement, setPlatinumElement] = useRecoilState(platinumElementState);
  const [diamondElement, setDiamondElement] = useRecoilState(diamondElementState);
  const [rubyElement, setRubyElement] = useRecoilState(rubyElementState);

  const problemToComponent = (problem: ProblemDto) => {
    return (
      <Row>
        <Col>{problem.titleKo}</Col>
        <Col>{problem.problemId}</Col>
      </Row>
    )
  }

  const updateSolvedProblem = async () => {
    const solved = await solvedacApi.searchSolvedProblemByGroup(member.split(" |\\n"));

    function update(level: LevelType, setter: SetterOrUpdater<JSX.Element[]>, amount: number) {
      if (amount > 0) {
        solvedacApi.searchUnsolvedProblemByLevel(
          // TODO improve searchTag split option
          solved, amount, level, level, searchTag.split(' '), directionOption, sortOption).then((problems) => {
            const result: JSX.Element[] = [];
            problems.forEach((problem) => result.push(problemToComponent(problem)));
            setter(result);
          });
      }
    }

    update(Level.Bronze, setBronzeElement, amountBronze);
    update(Level.Silver, setSilverElement, amountSilver);
    update(Level.Gold, setGoldElement, amountGold);
    update(Level.Platinum, setPlatinumElement, amountPlatinum);
    update(Level.Diamond, setDiamondElement, amountDiamond);
    update(Level.Ruby, setRubyElement, amountRuby);
  }

  return (
    <>
      <Form>
        <MemberForm/>
        <AmountForm/>
        <SearchOption/>
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
