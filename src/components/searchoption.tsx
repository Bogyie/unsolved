import React from "react";
import { Form, Row, Col, Card, CardGroup } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { searchTagState, sortOptionState, directionOptionState, minAcceptedUserCountState } from "../atoms";
import { stringToSortType, stringToDirectionType, Sort, Direction } from "./solvedac";


export function SearchOption() {
    const [sortOption, setSortOption] = useRecoilState(sortOptionState);
    const [directionOption, setDirectionOption] = useRecoilState(directionOptionState);
    const [minAcceptUserCount, setMinAcceptUserCount] = useRecoilState(minAcceptedUserCountState);


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
        <CardGroup className='mt-3 mb-3'>
            <Card>
              <Card.Header>{`검색 우선순위`}</Card.Header>
              <Form.Select defaultValue={sortOption} onChange={onChangeSortOption}>
                <option value={Sort.id}>문제 번호</option>
                <option value={Sort.level}>난이도</option>
                <option value={Sort.title}>문제 제목</option>
                <option value={Sort.average_try}>평균 시도</option>
                <option value={Sort.random}>랜덤</option>
              </Form.Select>
            </Card>
            <Card>
              <Card.Header>{`검색 우선순위`}</Card.Header>
              <Form.Select defaultValue={directionOption} onChange={onChangeDirectionOption}>
                <option value={Direction.asc}>오름차순</option>
                <option value={Direction.desc}>내림차순</option>
              </Form.Select>
            </Card>
            <Card>
              <Card.Header>{`최소 맞은 인원`}</Card.Header>
              <Form.Control value={minAcceptUserCount} onChange={onChangeMinAccpectUserCount}/>
            </Card>
        </CardGroup>
    )
}