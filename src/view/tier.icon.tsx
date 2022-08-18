import axios, { AxiosResponse } from "axios";


const tiers = [
    '?',
    'b5','b4','b3','b2','b1',
    's5','s4','s3','s2','s1',
    'g5','g4','g3','g2','g1',
    'p5','p4','p3','p2','p1',
    'd5','d4','d3','d2','d1',
    'r5','r4','r3','r2','r1'
]

export async function nameTo(name: string): Promise<AxiosResponse<SVGElement>> {
    let tier = 1;

    'b'

    's'

    'g'

    'p'

    'd'

    'r'


    

}
}

export async function tierIcon(tier: number 
 string): Promise<AxiosResponse<SVGElement>> {
    return axios.get(`https://static.solved.ac/tier_small/${tier}.svg`)
}