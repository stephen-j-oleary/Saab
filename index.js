
// Github repo located at https://github.com/stephen-j-oleary/Saab

const { match } = importModule("path-to-regexp-scriptable");

module.exports = function Saab() {
  let isConfigured = false;
  const handlers = [];

  async function config(wv) {
    await wv.evaluateJavaScript(`
      window.saab = {
        randomCounter: 0,
        requests: [],
        randomUUID() {
          const incrementCounter = () => String(++this.randomCounter);

          const randomizeTime = () => String(Date.now());

          const randomizeNumbers = () => {
            let text = String(Math.random());
            for (let i = text.length; i < 19; ++i) {
              text += "0";
            }
            return text.substring(2, 19);
          }

          return incrementCounter() + "-" + randomizeTime() + "-" + randomizeNumbers();
        },
        async request(config) {
          const id = this.randomUUID();
          let resolve, reject;
          const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });

          config.path = config.path.replace(/^\\/?/, "/"); // Add leading slash to request

          // Create a global callback for scriptable to resolve or reject the promise
          await this.createRequest({ id, config, resolve, reject });

          // Wait for promise to be resolved
          const response = await promise;

          return response;
        },
        async get(path, payload = {}, config = {}) {
          return this.request({
            method: "get",
            path,
            payload,
            ...config
          });
        },
        async post(path, payload = {}, config = {}) {
          return this.request({
            method: "post",
            path,
            payload,
            ...config
          });
        },
        async patch(path, payload = {}, config = {}) {
          return this.request({
            method: "patch",
            path,
            payload,
            ...config
          });
        },
        async put(path, payload = {}, config = {}) {
          return this.request({
            method: "put",
            path,
            payload,
            ...config
          });
        },
        async delete(path, payload = {}, config = {}) {
          return this.request({
            method: "delete",
            path,
            payload,
            ...config
          });
        },
        async createRequest(config) {
          this.requests.push(config);

          if (!this.requests.length) return;

          completion({
            id: this.requests[0].id,
            ...this.requests[0].config,
          });
        },
        callback(id, err, data) {
          const { resolve, reject } = this.requests.find(item => item.id === id);

          if (err) reject(err);
          else resolve(data);

          this.requests = this.requests.filter(item => item.id !== id);

          // Call the next queued request
          if (!this.requests.length) return;
          completion({
            id: this.requests[0].id,
            ...this.requests[0].config,
          });
        }
      };
      completion();
    `, true);
    isConfigured = true;
    return;
  }

  function addHandler(method, path, handler) {
    const pathMatcher = match(path);
    handlers.push({
      method,
      path,
      pathMatcher,
      handler
    });
  }

  function findMatchingHandler({ method, path }) {
    if (!method || !path) return {};
    const matchingHandlers = handlers.flatMap(h => {
      if (h.method && h.method !== method) return []; // Method didnt match
      const { params } = h.pathMatcher(path) || {}; // Paths that dont match will default to an empty object to avoid a destructuring error
      if (!params) return []; // Path didnt match
      return [{ ...h, params }];
    });
    return matchingHandlers.length ? matchingHandlers[0] : {};
  }

  // Listens for dispatch events from the WebView
  async function listen(wv, js = "") {
    if (!isConfigured) await config(wv);

    const { id, ...req } = await wv.evaluateJavaScript(js, true);

    const res = {
      error: error => {
        listen(wv, `window.saab.callback("${id}", ${JSON.stringify(error.message)}, undefined)`);
      },
      send: data => {
        listen(wv, `window.saab.callback("${id}", undefined, ${data})`);
      },
      json: data => {
        listen(wv, `window.saab.callback("${id}", undefined, ${JSON.stringify(data)})`);
      }
    };

    const { handler, params } = findMatchingHandler(req);
    if (!handler) return res.error("No matching route handler");

    try {
      await handler({ ...req, params }, res);
    }
    catch (err) {
      res.error(err);
    }
  }

  return {
    use(path, handler) {
      addHandler(null, path, handler);
    },
    get(path, handler) {
      addHandler("get", path, handler);
    },
    post(path, handler) {
      addHandler("post", path, handler);
    },
    patch(path, handler) {
      addHandler("patch", path, handler);
    },
    put(path, handler) {
      addHandler("put", path, handler);
    },
    delete(path, handler) {
      addHandler("delete", path, handler);
    },
    listen
  };
}
