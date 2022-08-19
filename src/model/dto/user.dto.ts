import { BackgroundDto } from "./background.dto";
import { BadgeDto } from "./badge.dto";
import { OrganizationDto } from "./organization.dto";

export interface UserDto {
    handle: string;
    bio?: string;
    organizations?: OrganizationDto[];
    badge?: BadgeDto;
    background?: BackgroundDto;
    profileImageUrl?: string;
    solvedCount?: number;
    voteCount?: number;
    exp?: number;
    tier?: number;
    rating?: number;
    ratingByProblemsSum?: number;
    ratingByClass?: number;
    ratingBySolvedCount?: number;
    ratingByVoteCount?: number;
    class?: number;
    classDecoration?: string;
    rivalCount?: number;
    reverseRivalCount?: number;
    maxStreak?: number;
}