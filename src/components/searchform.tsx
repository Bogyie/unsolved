import React, { useState } from "react";
import { Modal, Form, Button, ListGroupItem, ListGroup, Container, Row, Badge, CloseButton, ModalFooter, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RecoilState, useRecoilState } from "recoil";
import { SolvedacApi, SuggestionResult } from "./solvedac";

interface SuggestionResultParser {
    (data: SuggestionResult): string[];
}

export function SearchForm(
    title: string,
    parser: SuggestionResultParser,
    recoilState: RecoilState<Set<string>>,
) {
    const solvedacApi = new SolvedacApi();

    const [show, setShow] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [result, setResult] = useState<string[]>([]);

    const [state, setState] = useRecoilState(recoilState);

    const handleClose = () => {
        setShow(false);
        setSearch('');
        setResult([]);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleEnter = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const result = await solvedacApi.suggestion(search);
            setResult(parser(result.data).filter((b) => !state.has(b)));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    }

    const addBadge = (event: React.MouseEvent<HTMLButtonElement>) => {
        setState(state.add(event.currentTarget.name));
        setResult(result.filter((s) => s !== event.currentTarget.name));
    }

    const removeBadge = (event: React.MouseEvent<HTMLButtonElement>) => {
        setState(new Set<string>(Array.from(state).filter((s) => s !== event.currentTarget.name)));
    }


    return (
        <Card className="border-light bg-light">
            <Card.Header>
                {title}
            </Card.Header>
            <Card.Body >
                <div className="m-2 p-3 bg-white rounded"  >
                    {Array.from(state).map((m) =>
                        <Badge className="m-1" bg='light'>
                            <a href={`https://solved.ac/profile/${m}`} target="_blank">{m}</a>
                            <CloseButton name={m} onClick={removeBadge} />
                        </Badge >)}
                </div>
                <div>
                    <Button onClick={handleShow} className="bg-secondary border-0">{'Search'}</Button>
                </div>
            </Card.Body>
            <Card.Footer>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control value={search} onKeyUp={handleEnter} onChange={handleChange} />
                        <ListGroup>{result.map((s) => <ListGroupItem as='button' name={s} onClick={addBadge}>{s}</ListGroupItem>)}</ListGroup>
                    </Modal.Body>
                    <ModalFooter>
                        <Button onClick={handleClose}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </Card.Footer>
        </Card>
    )
}