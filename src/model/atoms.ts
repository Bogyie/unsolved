import { atomFamily, selectorFamily } from "recoil";
import { SolvedacApi } from "./api/solvedac.api";
import { LevelTypes, ProblemDto } from "./dto/problem.dto";
import { DirectoinTypes, SortTypes } from "./dto/searchquery.dto";
import { TagDto } from "./dto/tag.dto";
import { UserDto } from "./dto/user.dto";


export const amountState = atomFamily<number, number>({
    key: 'amountState',
    default: 0
})

export const tagState = atomFamily<TagDto[], number>({
    key: 'tagState',
    default: []
})

export const tagJoinState = atomFamily<'|' | '&', number>({
    key: 'tagJoinState',
    default: '|'  // | : 태그 중 하나라도 해당하는 문제  & : 모든 태그에 해당하는 문제
})

export const tagQueryState = selectorFamily<string, number>({
    key: 'tagQueryState',
    get: (key) => ({ get }) => get(tagState(key)).map(t => `#${t.key}`).join(get(tagJoinState(key)))
})

export const userState = atomFamily<UserDto[], number>({
    key: 'userState',
    default: []
})

export const userJoinState = atomFamily<'|' | '&', number>({
    key: 'userJoinState',
    default: '|' // | : 모든 유저가 풀지 않은 문제   & : 한 명이라도 풀지 않은 문제
})

export const userQueryState = selectorFamily<string, number>({
    key: 'userQueryState',
    get: (key) => ({ get }) => get(userState(key)).map(u => `@${u.handle}`).join(get(userJoinState(key)))

})

export const langState = atomFamily<'ko' | 'en' | '', number>({
    key: 'langState',
    default: 'ko'
})

export const langQueryState = selectorFamily<string, number>({
    key: 'langQueryState',
    get: (key) => ({ get }) => {
        const lang = get(langState(key));
        if (lang) {
            return `lang:${lang}`;
        }
        return '';
    },
    set: (key) => ({ set }, newValue) => {
        const value = newValue.toString();

        if (value.includes('ko')) {
            set(langState(key), 'ko');
            return;
        }

        if (value.includes('en')) {
            set(langState(key), 'en');
            return;
        }

        set(langState(key), '');
    }
})

export const levelState = atomFamily<{ easy: LevelTypes | '', hard: LevelTypes | '' }, number>({
    key: 'levelState',
    default: { easy: '', hard: '' }
})

export const levelQueryState = selectorFamily<string, number>({
    key: 'levelQueryState',
    get: (key) => ({ get }) => {
        const state = get(levelState(key));
        return `*${state.easy}..${state.hard}`;
    }
})

export const directoinState = atomFamily<DirectoinTypes, number>({
    key: 'directionState',
    default: 'asc'
})

export const sortState = atomFamily<SortTypes, number>({
    key: 'sortState',
    default: 'id'
})

export const searchQueryState = selectorFamily<string, number>({
    key: 'searchQueryState',
    get: (key) => ({ get }) => {
        return [
            `${get(levelQueryState(key))}`,     // level
            `${get(langQueryState(key))}`,      // lang
            `(${get(tagQueryState(key))})`,     // tag
            `!(${get(userQueryState(key))})`    // user
        ].join('&');
    }
})