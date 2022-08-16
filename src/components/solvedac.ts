
// DTO & Custom Types

import axios, { AxiosResponse } from "axios";

export interface ProblemDto {
    problemId: number;
    titleKo: string;
    isSolvable: boolean;
    isPartial: boolean;
    acceptedUserCount: number;
    level: LevelType;
    votedUserCount: number;
    isLevelLocked: boolean;
    averageTries: number;
}

const Level = {
    Bronze5 : 'b5',
    Bronze4 : 'b4',
    Bronze3 : 'b3',
    Bronze2 : 'b2',
    Bronze1 : 'b1',
    Silver5 : 's5',
    Silver4 : 's4',
    Silver3 : 's3',
    Silver2 : 's2',
    Silver1 : 's1',
    Gold5 : 'g5',
    Gold4 : 'g4',
    Gold3 : 'g3',
    Gold2 : 'g2',
    Gold1 : 'g1',
    Platinum5 : 'p5',
    Platinum4 : 'p4',
    Platinum3 : 'p3',
    Platinum2 : 'p2',
    Platinum1 : 'p1',
    Diamond5 : 'd5',
    Diamond4 : 'd4',
    Diamond3 : 'd3',
    Diamond2 : 'd2',
    Diamond1 : 'd1',
    Ruby5 : 'r5',
    Ruby4 : 'r4',
    Ruby3 : 'r3',
    Ruby2 : 'r2',
    Ruby1 : 'r1',
 } as const;

 const LevelArray = [
    'UnRanked',
    'Bronze 5',
    'Bronze 4',
    'Bronze 3',
    'Bronze 2',
    'Bronze 1',
    'Silver 5',
    'Silver 4',
    'Silver 3',
    'Silver 2',
    'Silver 1',
    'Gold 5',
    'Gold 4',
    'Gold 3',
    'Gold 2',
    'Gold 1',
    'Platinum 5',
    'Platinum 4',
    'Platinum 3',
    'Platinum 2',
    'Platinum 1',
    'Diamond 5',
    'Diamond 4',
    'Diamond 3',
    'Diamond 2',
    'Diamond 1',
    'Ruby 5',
    'Ruby 4',
    'Ruby 3',
    'Ruby 2',
    'Ruby 1',
 ] as const;

export type LevelType = typeof Level[ keyof typeof Level];

export interface SearchDto {
    count: number;
    items: ProblemDto[];
}

const Direction = {
    asc:'asc',
    desc:'desc'
} as const
export type DirectionType = typeof Direction[keyof typeof Direction];

const Sort = {
    id: 'id',
    level:'level',
    title:'title',
    average_try:'average_try',
    random:'random'
}
export type SortType = typeof Sort[keyof typeof Sort];

export interface SearchQueryDto {
    query: string;
    direction: DirectionType;
    page: number;
    sort: SortType;
}


// Class & Function

export class SolvedacApi {
    static itemsInPage = 100;
    static baseUrl = 'https://solved.ac/api/v3';

    private search(
        query: string,
        direction: DirectionType = 'desc',
        page: number = 1,
        sort: SortType = 'level'
    ): Promise<AxiosResponse<SearchDto>> {
        const uri = SolvedacApi.baseUrl + '/search/problem';
        return axios.get(
            uri,
            {
                params: {
                    query: query,
                    direction: direction,
                    page: page,
                    sort: sort,
                }
            }
        )
    }

    private async searchAll(
        query: string
    ): Promise<Set<ProblemDto>> {
        const result = new Set<ProblemDto>();

        let limit = 1;
        let page = 1;

        while (page <= limit) {
            const response = await this.search(query);
            const {status, data} = response;
            if (status === 200) {
                const {count, items} = data;
                limit = Math.ceil(count / SolvedacApi.itemsInPage);
                items.forEach((item) => {
                    result.add(item);
                })
            }
        }

        return result;
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

        for (const memberId of memberIds) {
            await this.searchSolvedProblemByMember(
                memberId
            ).then((items) => {
                items.forEach((item) => {
                    result.add(item);
                })
            });
        }

        return result;
    }

    public async searchUnsolvedProblemByLevel(
        solved: Set<ProblemDto>,
        amount: number,
        levelEasy: LevelType,
        levelHard: LevelType,
        direction: DirectionType = 'asc',
        sort: SortType = 'id',
    ) {
        const solvedProblemNumber = new Set<number>();
        solved.forEach((problem) => {
            solvedProblemNumber.add(problem.problemId);
        });

        const query = levelEasy === levelHard ? `*${levelEasy}` : `*${levelEasy}..${levelHard}`;

        let page = 1;
        let limit = 1;
        const reuslt = new Set<ProblemDto>;

        while (page++ <= limit) {
            const response = await this.search(query, direction, page, sort);

            if (response.status == 200) {
                const {data} = response;
                limit = Math.ceil(data.count / 100);

                for (const item of data.items) {
                    if (!solvedProblemNumber.has(item.problemId)) {
                        reuslt.add(item);
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


export function numericTierToString(tier:number) {
    return LevelArray[tier];
}
