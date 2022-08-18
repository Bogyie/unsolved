import { Card, FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { amountState, directoinState, langState, levelState, searchQueryState, sortState, tagJoinState, tagState, userState } from "../../model/atoms";
import { Form } from 'react-bootstrap';
import React from "react";
import { SolvedacApi } from "../../model/api/solvedac.api";
import { ProblemDto } from "../../model/dto/problem.dto";

export function SearchCard(cardId: number) {
    const [amount, setAmount] = useRecoilState(amountState(cardId));
    const [tag, setTag] = useRecoilState(tagState(cardId));
    const [tagJoin, setTagJoin] = useRecoilState(tagJoinState(cardId));
    const [user, setUser] = useRecoilState(userState(cardId));
    const [lang, setLang] = useRecoilState(langState(cardId));
    const [level, setLevel] = useRecoilState(levelState(cardId));
    const [direction, setDirection] = useRecoilState(directoinState(cardId));
    const [sort, setSort] = useRecoilState(sortState(cardId));
    const query = useRecoilValue(searchQueryState(cardId));
    
    let problems: ProblemDto[] = [];

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

    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.currentTarget.value));
    }

    const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag([{key:event.currentTarget.value}]);
    }

    return (
        <Card>
            <Form>
                <FormControl value={amount} onChange={amountChangeHandler} />
                <FormControl value={tag.length > 0 ? tag[0].key : ''} onChange={tagChangeHandler} />
            </Form>
            <div>{query}</div>
        </Card>
    )
}