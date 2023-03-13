/**
 * Remove leading slashes from a string
 *
 * @param candidate - string
 * @returns string
 */
export function trimLeadingSlashes(candidate: string) {
  return candidate.replace(/^\/+/, "");
}

/**
 * Remove trailing slashes from a string
 *
 * @param candidate - string
 * @returns string
 */
export function trimTrailingSlashes(candidate: string) {
  return candidate.replace(/\/+$/g, "");
}

/**
 * Join a path to a base url
 *
 * @param path string
 * @param baseUrl string
 * @returns string
 */
export function joinUrl(path: string, baseUrl?: string) {
  if (path.startsWith("http") || !baseUrl) {
    return path;
  }

  const sanitizedPath = trimLeadingSlashes(path);
  const sanitizedBaseUrl = trimTrailingSlashes(baseUrl);

  return [sanitizedBaseUrl, sanitizedPath].join("/");
}
