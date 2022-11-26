export type GlobalServerError = {
    log: string;
    status: number;
    message: { err: string };
}

export type Nde = {
    key: any;
    latency: number;
    next: any;
    prev: any;
    num: number;
}

export type EvQ = {
    head: any;
    tail: any;
    length: number;
    cache: any;
    nodeNum: number;
    add: any;
    removeSmallestLatencyFromGroup: any;
    updateRecencyOfExistingCache: any;
}

export type removedQueryKey = {
    latency: number;
    num: number;
    key: any;
}