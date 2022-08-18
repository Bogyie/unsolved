import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { amountBronzeState, amountSilverState, amountGoldState, amountPlatinumState, amountDiamondState, amountRubyState } from "../atoms";
import { inputNumberParser } from "./utils";

export function AmountForm() {
  const [amountBronze, setAmountBronze] = useRecoilState(amountBronzeState);
  const [amountSilver, setAmountSilver] = useRecoilState(amountSilverState);
  const [amountGold, setAmountGold] = useRecoilState(amountGoldState);
  const [amountPlatinum, setAmountPlatinum] = useRecoilState(amountPlatinumState);
  const [amountDiamond, setAmountDiamond] = useRecoilState(amountDiamondState);
  const [amountRuby, setAmountRuby] = useRecoilState(amountRubyState);

  const onChangeAmountBronze = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountBronze(inputNumberParser(event.currentTarget.value));
  }

  const onChangeAmountSilver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSilver(inputNumberParser(event.currentTarget.value));
  }

  const onChangeAmountGold = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountGold(inputNumberParser(event.currentTarget.value));
  }

  const onChangeAmountPlatinum = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPlatinum(inputNumberParser(event.currentTarget.value));
  }

  const onChangeAmountDiamond = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountDiamond(inputNumberParser(event.currentTarget.value));
  }

  const onChangeAmountRuby = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRuby(inputNumberParser(event.currentTarget.value));
  }

  return (
    <Card className='mt-3 mb-3 bg-light'>
      <Card.Header>
        {'문제 개수'}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form.Label style={{ color: 'rgb(160, 90, 31)', fontWeight: 'bold' }}>브론즈</Form.Label>
            <Form.Control value={amountBronze} onChange={onChangeAmountBronze} /></Col>
          <Col>
            <Form.Label style={{ color: 'rgb(119, 134, 154)', fontWeight: 'bold' }}>실버</Form.Label>
            <Form.Control value={amountSilver} onChange={onChangeAmountSilver} /></Col>
          <Col>
            <Form.Label style={{ color: 'rgb(223, 157, 55)', fontWeight: 'bold' }}>골드</Form.Label>
            <Form.Control value={amountGold} onChange={onChangeAmountGold} /></Col>
          <Col>
            <Form.Label style={{ color: 'rgb(39, 226, 164)', fontWeight: 'bold' }}>플래티넘</Form.Label>
            <Form.Control value={amountPlatinum} onChange={onChangeAmountPlatinum} /></Col>
          <Col>
            <Form.Label style={{ color: 'rgb(107, 188, 247)', fontWeight: 'bold' }}>다이아</Form.Label>
            <Form.Control value={amountDiamond} onChange={onChangeAmountDiamond} /></Col>
          <Col>
            <Form.Label style={{ color: 'rgb(231, 52, 100)', fontWeight: 'bold' }}>루비</Form.Label>
            <Form.Control value={amountRuby} onChange={onChangeAmountRuby} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}