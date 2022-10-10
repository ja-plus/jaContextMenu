export declare type Formatter<T, P> = (payload: P) => T;
export declare type BaseAttr<T, P> = T | Formatter<T, P>;
