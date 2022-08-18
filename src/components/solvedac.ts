
// DTO & Custom Types

import axios, { AxiosResponse } from "axios";










export function stringToDirectionType(str: string) {
    switch (str) {
        case 'asc':
            return Direction.asc;
        default:
            return Direction.desc;
    }
}



export function stringToSortType(str: string) {
    switch (str) {
        case 'id':
            return Sort.id;
        case 'level':
            return Sort.level;
        case 'title':
            return Sort.title;
        case 'average_try':
            return Sort.average_try;
        default:
            return Sort.random;
    }
}
















// Class & Function

export class SolvedacApi {
    static itemsInPage = 100;
    static baseUrl = 'https://solved.ac/api/v3';

    public suggestion(text: string): Promise<AxiosResponse<SuggestionResult>> {
        const uri = SolvedacApi.baseUrl + '/search/suggestion'
        return axios.get(uri, { params: { query: text } });
    }

    private search(
        query: string,
        page: number = 1,
        direction: DirectionType = 'desc',
        sort: SortType = 'level'
    ): Promise<AxiosResponse<SearchDto>> {
        const uri = `${SolvedacApi.baseUrl}/search/problem?query=${query}&direction=${direction}&page=${page}&sort=${sort}`;
        return axios.get(
            uri
        )
    }

    private async searchAll(
        query: string
    ): Promise<Set<ProblemDto>> {
        const already = new Set<number>();
        const result = new Set<ProblemDto>();

        let limit = 1;
        let page = 0;

        while (page++ < limit) {
            const response = await this.search(query, page);
            const { status, data } = response;
            if (status === 200) {
                const { count, items } = data;
                limit = Math.ceil(count / SolvedacApi.itemsInPage);
                items.forEach((item) => {
                    if (!already.has(item.problemId)) {
                        result.add(item);
                        already.add(item.problemId);
                    }
                })
            } else {
                break;
            }
        }

        return result;
    }

    private isEmptyArray(arr: any[]): boolean {
        arr = arr.filter((i) => i);
        if (arr.length < 1 || !arr[0]) {
            return true;
        }
        return false;
    }

    public async searchSolvedProblemByMember(
        memberId: string
    ): Promise<Set<ProblemDto>> {
        return await this.searchAll(`@${memberId}`);
    }

    public async searchSolvedProblemByGroup(
        memberIds: string[]
    ): Promise<Set<ProblemDto>> {

        const result = new Set<ProblemDto>();

        if (this.isEmptyArray(memberIds)) {
            return result;
        }

        await Promise.all(memberIds.map(
            async (memberId) => {
                const problemSet = await this.searchSolvedProblemByMember(memberId);
                problemSet.forEach((problem) => result.add(problem));
            })
        );

        return result;
    }

    public async searchUnsolvedProblemByLevel(
        solved: Set<ProblemDto>,
        amount: number,
        levelEasy: LevelType,
        levelHard: LevelType,
        searchTag: string[],
        direction: DirectionType = 'asc',
        sort: SortType = 'id',
        minAcceptUser: number = 100,
    ): Promise<Set<ProblemDto>> {
        const solvedProblemNumber = new Set<number>();
        solved.forEach((problem) => {
            solvedProblemNumber.add(problem.problemId);
        });

        let query = levelEasy === levelHard ? `*${levelEasy}` : `*${levelEasy}..${levelHard}`;

        if (!this.isEmptyArray(searchTag)) {
            query += '%20' + searchTag.map((i) => `%23${i}`).join('%20');
        }

        let page = 0;
        let limit = 1;
        const reuslt = new Set<ProblemDto>();
        const already = new Set<number>();


        while (page++ <= limit) {
            const response = await this.search(query, page, direction, sort);

            if (response.status === 200) {
                const { data } = response;
                limit = Math.ceil(data.count / 100);

                for (const item of data.items) {

                    if (
                        !solvedProblemNumber.has(item.problemId)  // 멤버 필터
                        && !already.has(item.problemId)
                        && minAcceptUser <= item.acceptedUserCount // 맞은 인원 수 필터
                    ) {
                        reuslt.add(item);
                        already.add(item.problemId);
                    }
                    if (reuslt.size >= amount) {
                        break;
                    }
                }
            } else {
                break;
            }

            if (reuslt.size >= amount) {
                break;
            }
        }

        return reuslt;
    }
}


export function numberToLevel(tier: number) {
    return LevelArray[tier];
}
