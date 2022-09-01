import { Card, FormCheck, FormControl} from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { 
    amountState, directionState, easyLevelColorState,
    easyLevelNumberState, easyLevelState, hardLevelColorState, hardLevelNumberState, 
    langState, searchQueryState, sortState, tagJoinLabelState, 
    tagJoinState, tagState, userJoinLabelState, userJoinState, userState 
} from "../../model/atoms";
import { Form } from 'react-bootstrap';
import React, { useState } from "react";
import { SolvedacApi } from "../../model/api/solvedac.api";
import { ProblemDto } from "../../model/dto/problem.dto";
import { getTierIcon } from "../../asset";
import { TagDto } from "../../model/dto/tag.dto";
import { Dialog } from "./modal";
import { UserDto } from "../../model/dto/user.dto";

// TODO : 컴포넌트 분리
export function SearchCard(cardId: number) {

    // Lang
    // TODO : select box impl
    const [lang, setLang] = useRecoilState(langState(cardId));

    // Direction
    const [direction, setDirection] = useRecoilState(directionState(cardId));

    // Sort
    const [sort, setSort] = useRecoilState(sortState(cardId));
    
    // Problem
    let problems: ProblemDto[] = [];
    const query = useRecoilValue(searchQueryState(cardId));
    async function fetchProblem() {
        const includes = new Set<number>();
        problems = [];
        const params = {
            page: 0,
            query: query,
            direction: direction,
            sort: sort,
        }

        let pageLimit = 1;
        while (++params.page <= pageLimit && amount < problems.length) {
            const searchResult = await SolvedacApi.search(params);
            pageLimit = Math.ceil(searchResult.count / 100);

            for (const problem of searchResult.items) {
                if (!includes.has(problem.problemId)) {
                    includes.add(problem.problemId);
                    problems.push(problem);

                    if (amount <= problems.length) {
                        break;
                    }
                }
            }
        }
    }

    // Amount
    const [amount, setAmount] = useRecoilState(amountState(cardId));
    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+event.currentTarget.value)) {
            setAmount(Number(event.currentTarget.value));
        } else {
            alert('숫자만 입력 가능합니다.')
        }
    }

    // Tag
    const [tag, setTag] = useRecoilState(tagState(cardId));
    const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO : Suggestion Dialog 와 연계하여 기능 구현
        setTag([{key:event.currentTarget.value}, {key:event.currentTarget.value}]);
    }

    const tagJoinLabel = useRecoilValue(tagJoinLabelState(cardId));
    const setTagJoin = useSetRecoilState(tagJoinState(cardId));
    const tagJoinChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setTagJoin('&');
        } else {
            setTagJoin('|');
        }
    }

    const TagSearchDialog = () => Dialog<TagDto>(
      '태그', setTag,(s) => s.tags);

    // User
    const [user, setUser] = useRecoilState(userState(cardId));
    const userChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO : Suggestion Dialog 와 연계하여 기능 구현
        setUser([{handle:event.currentTarget.value}, {handle:event.currentTarget.value}]);
    }

    const userJoinLabel = useRecoilValue(userJoinLabelState(cardId));
    const setUserJoin = useSetRecoilState(userJoinState(cardId));
    const userJoinChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setUserJoin('&');
        } else {
            setUserJoin('|');
        }
    }

    const UserSearchDialog = () => Dialog<UserDto>(
      '유저', setUser,(s) => s.users);

    const [tierIcon, setTierIcon] = useState(getTierIcon('b1')(''));
    const [easyLevelColor, setEasyLevelColor] = useRecoilState(easyLevelColorState(cardId));
    const [easyLevelNumber, setEasyLevelNumber] = useRecoilState(easyLevelNumberState(cardId));
    const easyLevel = useRecoilValue(easyLevelState(cardId));
    // TODO : Level 선택 기능 구현
    const easyLevelColorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.currentTarget.value) {
            case 'b':
                setEasyLevelColor('b');
                setTierIcon(getTierIcon('b')(''))
                break;
            case 's':
                setEasyLevelColor('s');
                setTierIcon(getTierIcon('s')(''))
                break;
            case 'g':
                setEasyLevelColor('g');
                setTierIcon(getTierIcon('g')(''))
                break;
            case 'p':
                setEasyLevelColor('p');
                setTierIcon(getTierIcon('p')(''))
                break;
            case 'd':
                setEasyLevelColor('d');
                setTierIcon(getTierIcon('d')(''))
                break;
            case 'r':
                setEasyLevelColor('r');
                setTierIcon(getTierIcon('r')(''))
                break;
        }
    }

    const [hardLevelColor, setHardLevelColor] = useRecoilState(hardLevelColorState(cardId));
    const [hardLevelNumber, setHardLevelNumber] = useRecoilState(hardLevelNumberState(cardId));

    return (
        <Card>
            <Form>
                {tierIcon}
                <FormControl value={easyLevelColor} onChange={easyLevelColorChangeHandler}/>
                <FormControl value={amount} onChange={amountChangeHandler} />
                <FormCheck type='switch' label={tagJoinLabel} onChange={tagJoinChangeHandler}/>
                <FormCheck type='switch' label={userJoinLabel} onChange={userJoinChangeHandler}/>
                {/*TODO FormControl 말고 캡슐 형태로 표현, 해당 영역 클릭하면 검색 창 띄움*/}
                <FormControl value={tag.length > 0 ? tag[0].key : ''} onChange={tagChangeHandler} />
                <TagSearchDialog/>
                {/*TODO FormControl 말고 캡슐 형태로 표현, 해당 영역 클릭하면 검색 창 띄움*/}
                <FormControl value={user.length > 0 ? user[0].handle : ''} onChange={userChangeHandler} />
                <UserSearchDialog/>
            </Form>
            <div>{query}</div>
        </Card>
    )
}