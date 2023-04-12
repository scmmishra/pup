<div align="center">
<br>
<br>
<p>
  <img src=".github/pupper.webp" style="height: 150px;">
  <h1>pup-fetch</h1>
</p>
<br>
<br>

![DeepSource](https://deepsource.io/gh/scmmishra/pup.svg/?label=active+issues&show_trend=true&token=_HAIDwNbi1ocMhaBKxB_BcSQ)
![DeepSource](https://deepsource.io/gh/scmmishra/pup.svg/?label=resolved+issues&show_trend=true&token=_HAIDwNbi1ocMhaBKxB_BcSQ)
![Less than 400B](https://deno.bundlejs.com/?q=pup-fetch&badge)

  <p>A tiny (370B) pupper that fetches for you, pup is a slim wrapper around fetch</p>

</div>

## Installation

```sh
pnpm install pup-fetch
```

```sh
npm install pup-fetch
```

```sh
yarn install pup-fetch
```

## Usage

Import the methods you need from the module:

```js
import { get, post } from "pup-fetch";
```

### GET Requests

Make a GET request using the get method:

```ts
const response = await get<MyResponseType>("/api/my-endpoint");
```

The `get` method takes two arguments: the `path` to the endpoint and an optional configuration object. The configuration object can include a `baseUrl` property to specify a base URL to prepend to the endpoint path.

### POST Requests

Make a POST request using the post method:

```ts
const body = { name: "John Doe", email: "john.doe@example.com" };
const response = await post<MyResponseType>("/api/my-endpoint", body);
```

The `post` method takes three arguments: the `path` to the endpoint, the request `body`, and an optional configuration object. Like with `get`, the configuration object can include a `baseUrl` property.

### Configuration

The `RequestConfig` interface defines the configuration options for HTTP requests. The following properties are available:

- `baseUrl`: The base URL to prepend to the endpoint path.
- `method`: The HTTP method to use (e.g. GET, POST, PUT, DELETE).
- `headers`: An object containing HTTP headers to include in the request.
- `body`: The request body, as a string or an object that can be serialized to JSON.
- `mode`: The request mode, which can be "cors", "no-cors", "same-origin", or "navigate".
- `cache`: The cache mode, which can be "default", "no-store", "reload", "no-cache", "force-cache", or "only-if-cached".
- `redirect`: The redirect mode, which can be "follow", "error", or "manual".
