import { Adapter } from "./types";


export function ScriptableWebViewAdapter(wv: Pick<WebView, "evaluateJavaScript">): Adapter {
  return {
    runInContext: js => wv.evaluateJavaScript(js, true),
  };
}