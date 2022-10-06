export declare type TextFormatter<T> = (payload: T) => string;
export declare type Text<T> = string | TextFormatter<T>;
