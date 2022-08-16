import { searchTagState } from "../atoms";
import { SearchForm } from "./searchform";
import { SuggestionResult } from "./solvedac";

export const TagForm = () =>
    SearchForm("태그",
        (data: SuggestionResult) => data.tags.map((tag) => tag.key),
        searchTagState);