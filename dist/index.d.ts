type ReqHandler = (path: string, handler: any) => void;
type Saab = {
    use: ReqHandler;
    get: ReqHandler;
    post: ReqHandler;
    patch: ReqHandler;
    put: ReqHandler;
    delete: ReqHandler;
    listen: (wv: any, js?: string) => Promise<any>;
};
export default function Saab(): Saab;
export {};
