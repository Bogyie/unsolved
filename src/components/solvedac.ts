
// DTO & Custom Types

export interface ProblemDto {
    problemId: number;
    titleKo: string;
    isSolvable: boolean;
    isPartial: boolean;
    acceptedUserCount: number;
    level: ProblemLevel;
    votedUserCount: number;
    isLevelLocked: boolean;
    averageTries: number;
}

const Level = [
    'Unrated',
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
    static baseUrl = 'https://solved.ac/api/v3';

    
}