export interface ProblemDto {
    problemId: number;
    titleKo: string;
    isSolvable: boolean;
    isPartial: boolean;
    acceptedUserCount: number;
    level: LevelTypes;
    votedUserCount: number;
    isLevelLocked: boolean;
    averageTries: number;
}

export type LevelTypes =
    'b' | 'b5' | 'b4' | 'b3' | 'b2' | 'b1' |
    's' | 's5' | 's4' | 's3' | 's2' | 's1' |
    'g' | 'g5' | 'g4' | 'g3' | 'g2' | 'g1' |
    'p' | 'p5' | 'p4' | 'p3' | 'p2' | 'p1' |
    'd' | 'd5' | 'd4' | 'd3' | 'd2' | 'd1' |
    'r' | 'r5' | 'r4' | 'r3' | 'r2' | 'r1';