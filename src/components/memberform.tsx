import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { memberState } from "../atoms";

export function MemberForm() {
    // member
    const [member, setMember] = useRecoilState(memberState);

    const onChangeMamber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMember(event.currentTarget.value);
    }

    return (
        <Form.Group className='mb-3' controlId='fromGroupMember'>
            <Form.Label>{'멤버 목록 (띄어쓰기로 구분)'}</Form.Label>
            <Form.Control as='textarea' rows={3} value={member} onChange={onChangeMamber} />
        </Form.Group>
    )
}