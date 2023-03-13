export function trimLeadingSlashes(candidate: string) {
  return candidate.replace(/^\/+/, "");
}

export function trimTrailingSlashes(candidate: string) {
  return candidate.replace(/\/+$/g, "");
}

export function joinUrl(path: string, baseUrl?: string) {
  if (path.startsWith("http") || !baseUrl) {
    return path;
  }

  const sanitizedPath = trimLeadingSlashes(path);
  const sanitizedBaseUrl = trimTrailingSlashes(baseUrl);

  return [sanitizedBaseUrl, sanitizedPath].join("/");
}
