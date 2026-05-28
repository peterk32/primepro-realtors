import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import { Readable } from "node:stream";
import app from "./dist/server/server.js";

const port = Number(process.env.PORT ?? 3000);
const clientDir = join(process.cwd(), "dist", "client");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getMimeType(filePath) {
  const ext = filePath.slice(filePath.lastIndexOf("."));
  return mimeTypes[ext] ?? "application/octet-stream";
}

function tryServeStatic(req, res) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const filePath = normalize(join(clientDir, decodedPath));

  if (!filePath.startsWith(clientDir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    return false;
  }

  res.writeHead(200, {
    "content-type": getMimeType(filePath),
    "cache-control": decodedPath.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=300",
  });
  createReadStream(filePath).pipe(res);
  return true;
}

function createFetchRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers.host ?? `localhost:${port}`;
  const url = `${protocol}://${host}${req.url ?? "/"}`;
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else if (value != null) {
      headers.set(key, value);
    }
  }

  const init = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }

  return new Request(url, init);
}

async function sendFetchResponse(fetchResponse, res) {
  res.statusCode = fetchResponse.status;
  fetchResponse.headers.forEach((value, key) => res.setHeader(key, value));

  if (!fetchResponse.body) {
    res.end();
    return;
  }

  Readable.fromWeb(fetchResponse.body).pipe(res);
}

createServer(async (req, res) => {
  try {
    if (req.method === "GET" || req.method === "HEAD") {
      if (tryServeStatic(req, res)) return;
    }

    const fetchRequest = createFetchRequest(req);
    const fetchResponse = await app.fetch(fetchRequest, process.env, {});
    await sendFetchResponse(fetchResponse, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("Internal Server Error");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`kesmarthomes listening on port ${port}`);
});