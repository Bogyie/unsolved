import { ProblemDto } from './problem.dto';

export interface SearchDto {
    count: number;
    items: ProblemDto[];
}