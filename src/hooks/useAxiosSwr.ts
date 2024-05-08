import { apiGet } from "@/config/common/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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
    const {data: responseData, ...res} = useSWR<APIResponseApiGet<T>>(deps, apiGet)
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
    return {
        data: results,
        count,
        next: Boolean(next),
        previous: Boolean(previous),
        ...res
    }
}


export function useAxiosSWRInfiniteLoading(apiUrl: string, filter?: any) {
    const PAGE_SIZE = 6;

    const {data, mutate, size, setSize, isValidating} = useSWRInfinite(
        (index) =>
            `${apiUrl}?limit=${PAGE_SIZE}&page=${index + 1}&filters=${filter}`,
        {
            fetcher: apiGet,
            revalidateFirstPage: false,
        }
    );
    return {data, mutate, size, setSize, isValidating};
}
