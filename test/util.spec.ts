import { assert, describe, it, beforeEach, afterEach, vi } from "vitest";
import { trimLeadingSlashes, trimTrailingSlashes, joinUrl } from "../src/utils";

describe("trimLeadingSlashes function", () => {
  it("should remove leading slashes from the string", () => {
    assert(
      trimLeadingSlashes("/example/string/with/leading/slashes") ===
        "example/string/with/leading/slashes"
    );
    assert(
      trimLeadingSlashes("///example//with//extra//slashes") ===
        "example//with//extra//slashes"
    );
    assert(trimLeadingSlashes("no/leading/slashes") === "no/leading/slashes");
  });
});

describe("trimTrailingSlashes function", () => {
  it("should remove trailing slashes from the string", () => {
    assert(
      trimTrailingSlashes("example/string/with/trailing/slashes//") ===
        "example/string/with/trailing/slashes"
    );
    assert(
      trimTrailingSlashes("example/with/extra/slashes////") ===
        "example/with/extra/slashes"
    );
    assert(
      trimTrailingSlashes("no/trailing/slashes") === "no/trailing/slashes"
    );
  });
});

describe("joinUrl function", () => {
  it("should join the path and base URL, trimming leading and trailing slashes", () => {
    assert(joinUrl("/path", "/base/url/") === "/base/url/path");
    assert(joinUrl("path", "base/url") === "base/url/path");
    console.log(joinUrl("base/url", "https://example.com"));
    assert(
      joinUrl("base/url", "https://example.com") ===
        "https://example.com/base/url"
    );
    assert(
      joinUrl("//base/url", "http://example.com///") ===
        "http://example.com/base/url"
    );
    assert(joinUrl("path", "") === "path");
  });
});
