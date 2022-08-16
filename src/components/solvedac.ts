
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

export const Level = {
    Bronze: 'b',
    Bronze5: 'b5',
    Bronze4: 'b4',
    Bronze3: 'b3',
    Bronze2: 'b2',
    Bronze1: 'b1',

    Silver: 's',
    Silver5: 's5',
    Silver4: 's4',
    Silver3: 's3',
    Silver2: 's2',
    Silver1: 's1',

    Gold: 'g',
    Gold5: 'g5',
    Gold4: 'g4',
    Gold3: 'g3',
    Gold2: 'g2',
    Gold1: 'g1',

    Platinum: 'p',
    Platinum5: 'p5',
    Platinum4: 'p4',
    Platinum3: 'p3',
    Platinum2: 'p2',
    Platinum1: 'p1',

    Diamond: 'd',
    Diamond5: 'd5',
    Diamond4: 'd4',
    Diamond3: 'd3',
    Diamond2: 'd2',
    Diamond1: 'd1',

    Ruby: 'r',
    Ruby5: 'r5',
    Ruby4: 'r4',
    Ruby3: 'r3',
    Ruby2: 'r2',
    Ruby1: 'r1',
} as const;

export const LevelArray = [
    Level.Bronze,
    Level.Bronze,
    Level.Bronze5,
    Level.Bronze4,
    Level.Bronze3,
    Level.Bronze2,
    Level.Bronze1,
    Level.Silver,
    Level.Silver5,
    Level.Silver4,
    Level.Silver3,
    Level.Silver2,
    Level.Silver1,
    Level.Gold,
    Level.Gold5,
    Level.Gold4,
    Level.Gold3,
    Level.Gold2,
    Level.Gold1,
    Level.Platinum,
    Level.Platinum5,
    Level.Platinum4,
    Level.Platinum3,
    Level.Platinum2,
    Level.Platinum1,
    Level.Diamond,
    Level.Diamond5,
    Level.Diamond4,
    Level.Diamond3,
    Level.Diamond2,
    Level.Diamond1,
    Level.Ruby,
    Level.Ruby5,
    Level.Ruby4,
    Level.Ruby3,
    Level.Ruby2,
    Level.Ruby1,
] as const;

export type LevelType = typeof Level[keyof typeof Level];

export interface SearchDto {
    count: number;
    items: ProblemDto[];
}

export const Direction = {
    asc: 'asc',
    desc: 'desc'
} as const;
export type DirectionType = typeof Direction[keyof typeof Direction];

export function stringToDirectionType(str: string) {
    switch (str) {
        case 'asc':
            return Direction.asc;
        default:
            return Direction.desc;
    }
}

export const Sort = {
    id: 'id',
    level: 'level',
    title: 'title',
    average_try: 'average_try',
    random: 'random'
} as const;
export type SortType = typeof Sort[keyof typeof Sort];

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

export interface SearchQueryDto {
    query: string;
    direction: DirectionType;
    page: number;
    sort: SortType;
}

export interface Organization {
    organizationId: number;
    name: string;
    type: string;
    rating: number;
    userCount: number;
    voteCount: number;
    solvedCount: number;
    color: string;
}

export interface Badge {
    badgeId: string;
    badgeImageUrl: string;
    displayName: string;
    displayDescription: string;
}

export interface Background {
    backgroundId: string;
    backgroundImageUrl: string;
    author: string;
    authorUrl: string;
    displayName: string;
    displayDescription: string;
}

export interface User {
    handle: string;
    bio: string;
    organizations: Organization[];
    badge: Badge;
    background: Background;
    profileImageUrl: string;
    solvedCount: number;
    voteCount: number;
    exp: number;
    tier: number;
    rating: number;
    ratingByProblemsSum: number;
    ratingByClass: number;
    ratingBySolvedCount: number;
    ratingByVoteCount: number;
    class: number;
    classDecoration: string;
    rivalCount: number;
    reverseRivalCount: number;
    maxStreak: number;
}

export interface Tag {
    key: string;
    isMeta: boolean;
    bojTagId: number;
    problemCount: number;
}

export interface SuggestionResult {
    problems: ProblemDto[];
    problemCount: number;
    users: User[];
    userCount: number;
    tags: Tag[];
    tagCount: number;
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
        // const uri = SolvedacApi.baseUrl + '/search/problem';
        return axios.get(
            uri,
            // {
            //     params: {
            //         query: query,
            //         direction: direction,
            //         page: page,
            //         sort: sort,
            //     }
            // }
        )
    }

    private async searchAll(
        query: string
    ): Promise<Set<ProblemDto>> {
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
                    result.add(item);
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

        while (page++ <= limit) {
            const response = await this.search(query, page, direction, sort);

            if (response.status === 200) {
                const { data } = response;
                limit = Math.ceil(data.count / 100);

                for (const item of data.items) {

                    if (
                        !solvedProblemNumber.has(item.problemId)  // 멤버 필터
                        && minAcceptUser <= item.acceptedUserCount // 맞은 인원 수 필터
                    ) {
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


export function numberToLevel(tier: number) {
    return LevelArray[tier];
}
