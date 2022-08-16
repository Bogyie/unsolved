import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { searchTagState, sortOptionState, directionOptionState, minAcceptedUserCountState } from "../atoms";
import { stringToSortType, stringToDirectionType, Sort, Direction } from "./solvedac";


export function SearchOption() {
    const [searchTag, setSearchTag] = useRecoilState(searchTagState);
    const [sortOption, setSortOption] = useRecoilState(sortOptionState);
    const [directionOption, setDirectionOption] = useRecoilState(directionOptionState);
    const [minAcceptUserCount, setMinAcceptUserCount] = useRecoilState(minAcceptedUserCountState);

    const onChangeSearchTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTag(event.currentTarget.value);
    }

    const onChangeSortOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(stringToSortType(event.currentTarget.value));
    }

    const onChangeDirectionOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDirectionOption(stringToDirectionType(event.currentTarget.value));
    }

    const onChangeMinAccpectUserCount = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMinAcceptUserCount(Number(event.currentTarget.value));
    }

    // TODO 한국어 문제만 검색
    // 멤버가 안푼 문제만 검색할지 선택 옵션

    return (
        <Form.Group controlId='searchOption'>
          <Row className='m-3' >
            <Form.Label>{`검색 태그 (띄어쓰기로 구분)`}</Form.Label>
            <Form.Control value={searchTag} onChange={onChangeSearchTag} />
          </Row>
          <Row className='m-3' >
            <Col>
              <Form.Label>{`정렬 기준`}</Form.Label>
              <Form.Select defaultValue={sortOption} onChange={onChangeSortOption}>
                <option value={Sort.id}>문제 ID</option>
                <option value={Sort.level}>문제 수준</option>
                <option value={Sort.title}>문제 제목</option>
                <option value={Sort.average_try}>평균 시도</option>
                <option value={Sort.random}>랜덤</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>{`검색 우선순위`}</Form.Label>
              <Form.Select defaultValue={directionOption} onChange={onChangeDirectionOption}>
                <option value={Direction.asc}>우선순위 높은 문제부터</option>
                <option value={Direction.desc}>우선순위 낮은 문제부터</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>{`최소 맞은 인원`}</Form.Label>
              <Form.Control value={minAcceptUserCount} onChange={onChangeMinAccpectUserCount}/>
            </Col>
          </Row>
        </Form.Group>
    )
}