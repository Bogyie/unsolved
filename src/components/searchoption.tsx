import { Form, Row, Col } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { searchTagState, sortOptionState, directionOptionState } from "../atoms";
import { stringToSortType, stringToDirectionType, Sort, Direction } from "./solvedac";


export function SearchOption() {
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

    // TODO 한국어 문제만 검색
    // TODO n명 이상 맞춘 문제만 검색

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
              <Form.Label>{`정렬 방법`}</Form.Label>
              <Form.Select defaultValue={directionOption} onChange={onChangeDirectionOption}>
                <option value={Direction.asc}>오름차순</option>
                <option value={Direction.desc}>내림차순</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
    )
}