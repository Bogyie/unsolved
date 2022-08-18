import axios from "axios";
import { SearchDto } from "../dto/search.dto";
import { DirectoinTypes, SortTypes } from "../dto/searchquery.dto";
import { SuggestionDto } from "../dto/suggestion.dto";

export class SolvedacApi {
    static ITEMS_IN_PAGE = 100;
    static BASE_URL = 'https://solved.ac/api/v3';
    static SEARCH_URL = this.BASE_URL + '/search';
    static SUGGESTION_URL = this.SEARCH_URL + '/suggestion';
    static PROBLEM_URL = this.SEARCH_URL + '/problem';

    public static async suggestion(keyword: string): Promise<SuggestionDto> {
        const result = await axios.get(SolvedacApi.SUGGESTION_URL, { params: { query: keyword } });
        if (result.status === 200) {
            return result.data;
        }
        return {
            problems: [], problemCount: 0,
            users: [], userCount: 0,
            tags: [], tagCount: 0,
        }
    }

    public static async search(
        params: {
            page?: number,
            direction?: DirectoinTypes,
            sort?: SortTypes,
            query?: string
        }
    ): Promise<SearchDto> {
        const result = await axios.get(SolvedacApi.PROBLEM_URL, { params });
        if (result.status === 200) {
            return result.data;
        }
        return { count: 0, items: [] };
    }
}