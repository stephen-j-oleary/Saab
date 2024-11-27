"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserAdapter = void 0;
function BrowserAdapter() {
    return {
        runInContext: js => new Promise((resolve, reject) => {
            const completion = resolve;
            eval(js);
        }),
    };
}
exports.BrowserAdapter = BrowserAdapter;
