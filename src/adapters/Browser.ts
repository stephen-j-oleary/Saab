import { Adapter } from "./types";


export function BrowserAdapter(): Adapter {
  return {
    runInContext: js => new Promise((resolve, reject) => {
      const completion = resolve;
      eval(js);
    }),
  };
}