import { catchError, filter, Observable, of, tap } from "rxjs";
import { Maybe } from "../block-pages/types";


export interface ILogOptions<T = unknown> {
    getDataFn?: (data: T) => unknown
    outputStacktrace?: boolean;
    color?: string;
}

export function log<T>(prefix: string, options?: ILogOptions<T>) {
    let { getDataFn, outputStacktrace, color }: ILogOptions<T> = options ?? {};

    if (!getDataFn) {
        getDataFn = (data: T) => data
    }

    return tap((data: T) => {
        const args = [prefix];
        if (color) {
            args[0] = '%c' + args[0];
            args.push(`color: ${color}`);
        }
        console.log(...args, getDataFn(data));
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