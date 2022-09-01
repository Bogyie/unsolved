import {SolvedacApi} from "../../model/api/solvedac.api";
import React, {useState} from "react";
import {FormControl, Button, Modal, ListGroupItem, ListGroup} from "react-bootstrap";
import {SuggestionDto} from "../../model/dto/suggestion.dto";
import {SetterOrUpdater} from "recoil";

interface getData<T> {
  (dto: SuggestionDto): T[];
}

export function Dialog<T>(
  title: string,
  dataSetter: SetterOrUpdater<T[]>,
  dataSelector: getData<T>
) {

  // TODO : 검색어를 입력하고 엔터를 치면 결과가 검색됨
  const [keyword, setKeyword] = useState('');
  const keywordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    resultHandler();
  }

  // TODO : 검색된 결과를 클릭하면 user 목록에 추가되고, 검색 결과에서 제외됨
  const [result, setResult] = useState<string[]>([]);
  const resultHandler = async () => {
    const suggestionDto = await SolvedacApi.suggestion(keyword);
    const data = dataSelector(suggestionDto);
    // setResult(data);
  }

  // Dialog 표시 제어
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {title} 검색
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{title} 검색</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl value={keyword} onChange={keywordChangeHandler}/>
          <ListGroup>
            {result.map(r => <ListGroupItem>{r}</ListGroupItem>)}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}