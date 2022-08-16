import { Form, Row, Col } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { amountBronzeState, amountSilverState, amountGoldState, amountPlatinumState, amountDiamondState, amountRubyState } from "../atoms";

export function AmountForm() {
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

    return (
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
    )
}