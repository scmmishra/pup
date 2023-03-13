import {
  expect,
  assert,
  describe,
  it,
  afterEach,
  vi,
  beforeAll,
  afterAll,
} from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { http, get, post } from "../src/pup";
import type { RequestConfig } from "../src/pup";

import { Request, Response, fetch } from "cross-fetch";

vi.stubGlobal("Response", Response);
vi.stubGlobal("Request", Request);
vi.stubGlobal("fetch", fetch);

const posts = [
  {
    userId: 1,
    id: 1,
    title: "first post title",
    body: "first post body",
  },
];

export const restHandlers = [
  rest.get("https://rest-endpoint.example/path/to/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),

  rest.get("https://rest-endpoint.example/path/to/error", (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Not authorized`,
      })
    );
  }),

  rest.post(
    "https://rest-endpoint.example/path/to/posts/create",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 2 }));
    }
  ),
];

const server = setupServer(...restHandlers);

describe("http function", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it("should make a GET request", async () => {
    const path = "path/to/posts";
    const baseUrl = "https://rest-endpoint.example";

    const config: RequestConfig = { method: "GET", baseUrl };
    const result = await http(path, config);
    expect(result).toMatchObject(posts);
  });

  it("should throw an error if the response is not ok", async () => {
    const path = "path/to/error";
    const baseUrl = "https://rest-endpoint.example";

    const config: RequestConfig = { method: "GET", baseUrl };
    await expect(http(path, config)).rejects.toThrow("403: Forbidden");
  });

  it("Should make a post request", async () => {
    const path = "path/to/posts/create";
    const baseUrl = "https://rest-endpoint.example";
    const config: RequestConfig = {
      method: "POST",
      baseUrl,
      body: JSON.stringify({
        title: "first post title",
        body: "first post body",
      }),
    };

    const result = await http(path, config);
    expect(result).toMatchObject({ id: 2 });
  });

  it("should make a GET request using wrapper", async () => {
    const path = "path/to/posts";
    const baseUrl = "https://rest-endpoint.example";

    const config: RequestConfig = { baseUrl };
    const result = await get(path, config);
    expect(result).toMatchObject(posts);
  });

  it("Should make a post request using wrapper", async () => {
    const path = "path/to/posts/create";
    const baseUrl = "https://rest-endpoint.example";

    const result = await post(
      path,
      {
        title: "first post title",
        body: "first post body",
      },
      {
        baseUrl,
      }
    );
    expect(result).toMatchObject({ id: 2 });
  });
});
