export interface OrganizationDto {
    organizationId: number;
    name: string;
    type: string;
    rating: number;
    userCount: number;
    voteCount: number;
    solvedCount: number;
    color: string;
}