import {
    B, B1, B2, B3, B4, B5,
    S, S1, S2, S3, S4, S5, 
    G, G1, G2, G3, G4, G5, 
    P, P1, P2, P3, P4, P5, 
    D, D1, D2, D3, D4, D5, 
    R, R1, R2, R3, R4, R5,
} from "./tier"
import {LevelTypes} from "../model/dto/problem.dto";

export function getTierIcon(name: LevelTypes): (props: any) => JSX.Element {
    switch (name) {
        case'b': // FIXME : SVG 파일이 정상 작동하지 않음.
            return B;
        case 'b5':
            return B5;
        case 'b4':
            return B4;
        case 'b3':
            return B3;
        case 'b2':
            return B2;
        case 'b1':
            return B1;
        case 's': // FIXME : SVG 파일이 정상 작동하지 않음.
            return S;
        case 's5':
            return S5;
        case 's4':
            return S4;
        case 's3':
            return S3;
        case 's2':
            return S2;
        case 's1':
            return S1;
        case 'g': // FIXME : SVG 파일이 정상 작동하지 않음.
            return G;
        case 'g5':
            return G5;
        case 'g4':
            return G4;
        case 'g3':
            return G3;
        case 'g2':
            return G2;
        case 'g1':
            return G1;
        case 'p': // FIXME : SVG 파일이 정상 작동하지 않음.
            return P;
        case 'p5':
            return P5;
        case 'p4':
            return P4;
        case 'p3':
            return P3;
        case 'p2':
            return P2;
        case 'p1':
            return P1;
        case 'd': // FIXME : SVG 파일이 정상 작동하지 않음.
            return D;
        case 'd5':
            return D5;
        case 'd4':
            return D4;
        case 'd3':
            return D3;
        case 'd2':
            return D2;
        case 'd1':
            return D1;
        case 'r': // FIXME : SVG 파일이 정상 작동하지 않음.
            return R;
        case 'r5':
            return R5;
        case 'r4':
            return R4;
        case 'r3':
            return R3;
        case 'r2':
            return R2;
        case 'r1':
            return R1;
        default:
            // FIXME : ? 아이콘으로 수정 필요
            return B;
    }
}