import { atom } from 'recoil';
import { Direction, DirectionType, Sort, SortType } from './components/solvedac';

// member
export const memberState = atom<Set<string>>({
    key: 'member',
    default: new Set<string>()
})

// amount
export const amountBronzeState = atom<number>({
    key: 'amountBronze',
    default: 0
});

export const amountSilverState = atom<number>({
    key: 'amountSilver',
    default: 0
});

export const amountGoldState = atom<number>({
    key: 'amountGold',
    default: 0
});

export const amountPlatinumState = atom<number>({
    key: 'amountPlatinum',
    default: 0
});

export const amountDiamondState = atom<number>({
    key: 'amountDiamond',
    default: 0
});

export const amountRubyState = atom<number>({
    key: 'amountRuby',
    default: 0
});

// search options
export const searchTagState = atom<Set<string>>({
    key: 'searchTag',
    default: new Set<string>()
})

export const sortOptionState = atom<SortType>({
    key: 'sortOption',
    default: Sort.random
});

export const directionOptionState = atom<DirectionType>({
    key: 'directionOption',
    default: Direction.desc
});

export const minAcceptedUserCountState = atom<number>({
    key: 'minAcceptedUserCount',
    default: 50
})

export const titleContainKoreanState = atom<boolean>({
    key: 'titleContainKorean',
    default: false
})

// search element
export const bronzeElementState = atom<JSX.Element[]>({
    key: 'bronzeElement',
    default: []
});

export const silverElementState = atom<JSX.Element[]>({
    key: 'silverElement',
    default: []
});

export const goldElementState = atom<JSX.Element[]>({
    key: 'goldElement',
    default: []
});

export const platinumElementState = atom<JSX.Element[]>({
    key: 'platinumElement',
    default: []
});

export const diamondElementState = atom<JSX.Element[]>({
    key: 'diamondElement',
    default: []
});

export const rubyElementState = atom<JSX.Element[]>({
    key: 'rubyElement',
    default: []
});
  // Atom End