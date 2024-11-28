import { Adapter } from "./types";


export function BrowserAdapter(): Adapter {
  return {
    runInContext: js => new Promise((resolve, reject) => {
      (new Function("window", "completion", js))(window, resolve);
    }),
  };
}