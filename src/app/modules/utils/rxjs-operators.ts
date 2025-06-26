import { catchError, filter, Observable, of, tap } from "rxjs";
import { Maybe } from "../block-pages/types";


export interface ILogOptions<T> {
    getDataFn?: (data: T) => unknown
    outputStacktrace?: boolean;
}

export function log<T>(prefix: string, options?: ILogOptions<T>) {
    let { getDataFn, outputStacktrace }: ILogOptions<T> = options ?? {};

    if (!getDataFn) {
        getDataFn = (data: T) => data
    }
    return tap((data: T) => {

        console.log(prefix, getDataFn(data));
        if (outputStacktrace) {
            console.trace()
        }
    });
}

export function filterUndefined<T>() {
    return filter((value: Maybe<T>): value is T => value !== undefined)
}

export function ignoreError<T>() {
    return catchError((err, caught: Observable<T>) => caught)
}