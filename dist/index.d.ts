import { Adapter } from "./adapters/types";
export { ScriptableWebViewAdapter } from "./adapters/Scriptable";
export { BrowserAdapter } from "./adapters/Browser";
type HandlerFunc = (req: any, res: any) => Promise<void>;
type Saab = {
    use: (path: string, handler: HandlerFunc) => void;
    get: (path: string, handler: HandlerFunc) => void;
    post: (path: string, handler: HandlerFunc) => void;
    patch: (path: string, handler: HandlerFunc) => void;
    put: (path: string, handler: HandlerFunc) => void;
    delete: (path: string, handler: HandlerFunc) => void;
    listen: (js?: string) => Promise<any>;
};
export default function Saab(adapter: Adapter): Saab;
