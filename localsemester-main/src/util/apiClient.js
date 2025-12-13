const isLocalhost = ["localhost", "127.0.0.1"].includes(
  window.location.hostname,
);

const localhostBase = "http://localhost:4000";
const dockerBase = "http://backend:4000";

const apiBaseCandidates = [
  process.env.REACT_APP_API_URL,
  process.env.API_URL,
  isLocalhost ? localhostBase : undefined,
  localhostBase,
  dockerBase,
].filter(Boolean);

let API_BASE_URL = apiBaseCandidates[0] || "";

// If an env points to Docker service name but the browser is on localhost,
// prefer the loopback host to avoid DNS errors on macOS.
if (
  API_BASE_URL.includes("://backend") &&
  isLocalhost
) {
  console.warn(
    "[api] backend hostname not resolvable on localhost; falling back to http://localhost:4000",
  );
  API_BASE_URL = localhostBase;
}

const withApiBase = (path) => {
  if (!path) return "";
  // Already absolute (http/https/data/etc.)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path)) return path;

  const base = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

// Limit rewriting to API endpoints only.
const API_PATH_PREFIXES = [
  "/auth",
  "/user",
  "/post",
  "/session",
  "/photo",
  "/member",
  "/semester",
  "/semesterComment",
  "/postComment",
  "/uploads",
];

const normalizeApiUrl = (input) => {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const path = input.startsWith("/") ? input : `/${input}`;
  return `${base}${path}`;
};

const originalFetch = window.fetch.bind(window);

if (API_BASE_URL) {
  console.info(`[api] Using base URL ${API_BASE_URL}`);
}

// Wrap fetch so API_BASE_URL is automatically prefixed when configured.
window.fetch = (input, init) => {
  if (typeof input === "string") {
    const matchesPrefix = API_PATH_PREFIXES.some((prefix) =>
      input.startsWith(prefix),
    );

    if (matchesPrefix && API_BASE_URL) {
      return originalFetch(normalizeApiUrl(input), init);
    }
  }

  return originalFetch(input, init);
};

export { API_BASE_URL };
export { withApiBase };
