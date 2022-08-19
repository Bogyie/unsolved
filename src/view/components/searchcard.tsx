import { Card, FormCheck, FormControl, FormSelect } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { 
    amountState, directoinState, easyLevelColorState, 
    easyLevelNumberState, easyLevelState, hardLevelColorState, hardLevelNumberState, 
    langState, searchQueryState, sortState, tagJoinLabelState, 
    tagJoinState, tagState, userJoinLabelState, userJoinState, userState 
} from "../../model/atoms";
import { Form } from 'react-bootstrap';
import React, { useState } from "react";
import { SolvedacApi } from "../../model/api/solvedac.api";
import { ProblemDto } from "../../model/dto/problem.dto";
import { TierIcon } from "../../asset";

export function SearchCard(cardId: number) {
    
    const [lang, setLang] = useRecoilState(langState(cardId));
    const [direction, setDirection] = useRecoilState(directoinState(cardId));
    const [sort, setSort] = useRecoilState(sortState(cardId));
    
    
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

    const [amount, setAmount] = useRecoilState(amountState(cardId));
    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+event.currentTarget.value)) {
            setAmount(Number(event.currentTarget.value));
        } else {
            alert('숫자만 입력 가능합니다.')
        }
    }

    const [tag, setTag] = useRecoilState(tagState(cardId));
    const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const [user, setUser] = useRecoilState(userState(cardId));
    const userChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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


    const [easyLevelColor, setEasyLevelColor] = useRecoilState(easyLevelColorState(cardId));
    const [easyLevelNumber, setEasyLevelNumber] = useRecoilState(easyLevelNumberState(cardId));
    const easyLevel = useRecoilValue(easyLevelState(cardId));

    // type check and get
    // https://stackoverflow.com/questions/43804805/check-if-value-exists-in-enum-in-typescript
    const B = Obejct;

    const [hardLevelColor, setHardLevelColor] = useRecoilState(hardLevelColorState(cardId));
    const [hardLevelNumber, setHardLevelNumber] = useRecoilState(hardLevelNumberState(cardId));

    return (
        <Card>
            <B/>
            <Form>
                <FormControl value={amount} onChange={amountChangeHandler} />
                <FormCheck type='switch' label={tagJoinLabel} onChange={tagJoinChangeHandler}/>
                <FormCheck type='switch' label={userJoinLabel} onChange={userJoinChangeHandler}/>
                <FormControl value={tag.length > 0 ? tag[0].key : ''} onChange={tagChangeHandler} />
                <FormControl value={user.length > 0 ? user[0].handle : ''} onChange={userChangeHandler} />
            </Form>
            <div>{query}</div>
        </Card>
    )
}