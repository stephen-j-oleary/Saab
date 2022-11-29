# Scriptable as a Backend

A Scriptable package that handles two-way communication between a WebView and the Scriptable app.

## Installation

> Requires the [`path-to-regexp-scriptable`](https://github.com/stephen-j-oleary/path-to-regexp-scriptable/) package.\
> Ensure it is installed in your Scriptable folder as well.

To start using the package in Scriptable, either copy index.js to your Scriptable folder or run:

```
npm run use
```

By default, the package will be copied to `~/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents` and named `Saab`

## Usage

### In Scriptable:

```javascript
const Saab = importModule("Saab");
const saab = Saab();

// saab.use(path, handler)
// saab.get(path, handler)
// saab.post(path, handler)
// saab.put(path, handler)
// saab.delete(path, handler)
// saab.listen(wv)
```

#### Use, Get, Post, Put, and Delete

The `use` method will handle any request method. Each other method handles their respective request method.

- **path** A string indicating the path to match. See [`path-to-regexp-scriptable`](https://github.com/stephen-j-oleary/path-to-regexp-scriptable/blob/master/Readme.md#match) for acceptable values
- **handler** A handler method of the form `(req, res) => {}`
  - **req** The request object
    - **method** The request method (get|post|put|delete)
    - **path** The request path (eg. /customer)
    - **payload** The request payload object
    - **params** The request route params
  - **res** The response object
    - **error** Sends an error response
      - **val** The error object or string to send
    - **send** Sends a response
      - **str** The string response to send
    - **json** Sends a json response
      - **obj** The json object to send

#### Listen

The `listen` function starts the listener on the given `wv`

- **wv** The WebView instance to start listening for requests on

### In WebView:

> The package will add an `saab` object on the `window` in the WebView

```javascript
// window.saab.request(config)
// window.saab.get(path, payload?, config?)
// window.saab.post(path, payload?, config?)
// window.saab.put(path, payload?, config?)
// window.saab.delete(path, payload?, config?)
```

#### Request

The `request` method will send a request with the given `config`.

- **config** The request config
  - **method** The request method (get|post|put|delete)
  - **path** The request path
  - **payload** The request payload object
  - **...props** Any additional config properties

#### Get, Post, Put, and Delete

These methods will send a request with the given `config` and their respective request method.

- **path** The request path
- **payload** The request payload object
- **config** An object holding any additional config properties
