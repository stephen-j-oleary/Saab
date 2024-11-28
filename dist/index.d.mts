type Adapter = {
    /**
     * Runs the js in the context containing 'window' and 'completion' global variables
     * 'completion' is a function that resolves runInContext with the passed value. The value must be JSON serializable
     * 'window' is the Window for the browser or webview instance
     */
    runInContext: (js: string) => Promise<{
        id: string;
        method: string;
        path: string;
    }>;
};

declare function ScriptableWebViewAdapter(wv: Pick<WebView, "evaluateJavaScript">): Adapter;

declare function BrowserAdapter(): Adapter;

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
declare function Saab(adapter: Adapter): Saab;

export { BrowserAdapter, ScriptableWebViewAdapter, Saab as default };
