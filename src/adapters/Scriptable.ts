import { Adapter } from "./types";


export function ScriptableWebViewAdapter(wv: WebView): Adapter {
  return {
    runInContext: js => wv.evaluateJavaScript(js, true),
  };
}