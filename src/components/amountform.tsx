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
        <Form.Group className='m-3' controlId='amountByLeve'>
          <Row>
            <Col>
              <Form.Label style={{ color: 'rgb(160, 90, 31)', fontWeight: 'bold' }}>브론즈 개수</Form.Label>
              <Form.Control value={amountBronze} onChange={onChangeAmountBronze} /></Col>
            <Col>
              <Form.Label style={{ color: 'rgb(119, 134, 154)', fontWeight: 'bold' }}>실버 개수</Form.Label>
              <Form.Control value={amountSilver} onChange={onChangeAmountSilver} /></Col>
            <Col>
              <Form.Label style={{ color: 'rgb(223, 157, 55)', fontWeight: 'bold' }}>골드 개수</Form.Label>
              <Form.Control value={amountGold} onChange={onChangeAmountGold} /></Col>
            <Col>
              <Form.Label style={{ color: 'rgb(39, 226, 164)', fontWeight: 'bold' }}>플래티넘 개수</Form.Label>
              <Form.Control value={amountPlatinum} onChange={onChangeAmountPlatinum} /></Col>
            <Col>
              <Form.Label style={{ color: 'rgb(107, 188, 247)', fontWeight: 'bold' }}>다이아 개수</Form.Label>
              <Form.Control value={amountDiamond} onChange={onChangeAmountDiamond} /></Col>
            <Col>
              <Form.Label style={{ color: 'rgb(231, 52, 100)', fontWeight: 'bold' }}>루비 개수</Form.Label>
              <Form.Control value={amountRuby} onChange={onChangeAmountRuby} /></Col>
          </Row>
        </Form.Group>
    )
}