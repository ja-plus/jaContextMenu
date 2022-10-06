export type TextFormatter<T> = (payload: T) => string;
export type Text<T> = string | TextFormatter<T>;
