export type Adapter = {
  /**
   * Runs the js in the context containing 'window' and 'completion' global variables
   * 'completion' is a function that resolves runInContext with the passed value. The value must be JSON serializable
   * 'window' is the Window for the browser or webview instance
   */
  runInContext: (js: string) => Promise<{ id: string, method: string, path: string }>,
};