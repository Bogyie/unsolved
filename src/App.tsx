import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './App.css';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  Direction, Level,
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

import React from 'react';
import { MemberForm } from './components/memberform';


function SearchForm() {
  const solvedacApi = new SolvedacApi();

  // member
  const member = useRecoilValue(memberState);

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

        <MemberForm/>

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
