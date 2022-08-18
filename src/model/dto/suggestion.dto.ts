import { ProblemDto } from "./problem.dto";
import { TagDto } from "./tag.dto";
import { UserDto } from "./user.dto";

export interface SuggestionDto {
    problems: ProblemDto[];
    problemCount: number;
    users: UserDto[];
    userCount: number;
    tags: TagDto[];
    tagCount: number;
}