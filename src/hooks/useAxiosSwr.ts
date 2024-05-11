import {apiGet} from "@/config/common/api";
import {extractPathFromUrl, updateUrlQueryParameter} from "@/config/common/functions";
import useSWR from "swr";

interface IFetchNext {
    limit?: number;
    offset?: number;
}

interface APIResponse<T> {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;

}

interface APIResponseApiGet<T> {
    data: APIResponse<T>
}

export function useAxiosSWR<T = any>(deps: string | null) {
    const {data: responseData, mutate, ...res} = useSWR<APIResponseApiGet<T>>(deps, apiGet)
    const {
        data: {results = [], count = 0, next, previous},
    } = responseData || {
        data: {
            results: [],
            count: 0,
            next: null,
            previous: null
        },
    };
    const fetchNext = async (opt?: IFetchNext) => {
        if (next) {
            let nextUrl = next;
            if (opt) {
                nextUrl = updateUrlQueryParameter(nextUrl, opt);
            }
            const nextPageResponse = await apiGet(extractPathFromUrl(nextUrl));
            await mutate(nextPageResponse, false);
        }
    };
    const fetchPrev = async (opt?: IFetchNext) => {
        if (previous) {
            let nextUrl = previous;
            if (opt) {
                nextUrl = updateUrlQueryParameter(nextUrl, opt);
            }
            const nextPageResponse = await apiGet(extractPathFromUrl(nextUrl));
            await mutate(nextPageResponse, false);
        }
    };
    return {
        data: results,
        count,
        next: Boolean(next),
        previous: Boolean(previous),
        fetchNext,
        fetchPrev,
        mutate,
        ...res
    }
}

