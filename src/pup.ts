import { joinUrl } from "./utils";

export interface RequestConfig extends RequestInit {
  baseUrl?: string;
}

/**
 * API wrapper to fetch
 *
 * @param  {string} path
 * @param  {RequestConfig} config
 * @returns Promise
 */
export async function http<T>(path: string, config: RequestConfig): Promise<T> {
  const requestPath = joinUrl(path, config.baseUrl);
  const request = new Request(requestPath, {
    ...config,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * GET method around
 *
 * @param  {string} path
 * @param  {RequestConfig} config?
 * @returns Promise
 */
export async function get<T>(path: string, config?: RequestConfig): Promise<T> {
  const init = { method: "GET", ...config };
  return await http<T>(path, init);
}

export async function post<T>(
  path: string,
  body: Record<string, unknown>,
  config?: RequestConfig
): Promise<T> {
  const init = {
    method: "POST",
    body: JSON.stringify(body),
    ...config,
  } as RequestConfig;
  return await http<T>(path, init);
}
