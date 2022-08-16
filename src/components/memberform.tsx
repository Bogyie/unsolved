import { memberState } from "../atoms";
import { SearchForm } from "./searchform";
import { SuggestionResult } from "./solvedac";


export const MemberForm = () =>
    SearchForm("멤버",
        (data: SuggestionResult) => data.users.map((user) => user.handle),
        memberState);