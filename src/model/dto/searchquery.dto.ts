export type DirectionTypes =
    'asc'       /* 오름차순 */
    | 'desc'    /* 내림차순 */;

export type SortTypes =
    'id'            /* 문제 아이디 ( 숫자 ) 순으로 정렬 */
    | 'level'       /* 문제 난이도 순으로 정렬 */
    | 'title'       /* 문제 제목 순으로 정렬 */
    | 'solved'      /* 해당 문제를 푼 유저 수로 정렬 */
    | 'average_try' /* 해당 문제의 평균 시도 횟수로 정렬 */
    | 'random'      /* 랜덤 정렬 */;

export interface SearchQueryDto {
    query: string;
    direction: DirectionTypes;
    page: number;
    sort: SortTypes;
}