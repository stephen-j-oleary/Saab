"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptableWebViewAdapter = void 0;
function ScriptableWebViewAdapter(wv) {
    return {
        runInContext: js => wv.evaluateJavaScript(js, true),
    };
}
exports.ScriptableWebViewAdapter = ScriptableWebViewAdapter;
