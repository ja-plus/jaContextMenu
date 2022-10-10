export type Formatter<T, P> = (payload: P) => T;
export type BaseAttr<T, P> = T | Formatter<T, P>;
