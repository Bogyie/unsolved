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

    return (
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
    )
}