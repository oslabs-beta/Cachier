export type GlobalServerError = {
    log: string;
    status: number;
    message: { err: string };
}

export type Node = {
    key: any;
    latency: number;
    next: any;
    prev: any;
    num: number;
}

export type EvictionQueue = {
    head: any;
    tail: any;
    length: number;
    cache: any;
    nodeNum: number;
}

export type removedQueryKey = {
    latency: number;
    num: number;
    key: any;
}