/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// https://github.com/kwhitley/itty-router => Tiny, zero-dependency router with route param and query parsing
import { Router } from "itty-router";

// Create a router (note the lack of "new")
const router = Router();

//// GET Partytown libs
// Use a regex to capture the splat route:  ^\/api\/partytown\/lib\/(?<splat>.+)
// E.g. http://localhost:8787/api/partytown/lib/foo/bar/baz.js => params: { splat: "foo/bar/baz.js" }
router.routes.push([
  "GET", // method: GET
  /^\/api\/partytown\/lib\/(?<splat>.+)/, // regex match with named groups (e.g. "splat")
  [
    async (req) => {
      const version = "@0.7.0"; // Specific Partytown version (pinned)
      // const version = ""; // Can also use latest version (unpinned)
      // const url = `https://unpkg.com/@builder.io/partytown${version}/lib/${req.params.splat}`;
      const url = `https://cdn.jsdelivr.net/npm/@builder.io/partytown${version}/lib/${req.params.splat}`;
      return await fetch(url);
    },
  ],
]);

//// GET Proxied request to passed in url
// // e.g. "?url=https%3A%2F%2Fwww.googletagmanager.com%2Fgtag%2Fjs%3Fid%3DUA-237191759-1%26l%3DdataLayer%26cx%3Dc"
// Note: Don't need to worry about CORS, as calls to this handler will be proxied via Shopify App proxy
// so will appear as same origin anyway
router.get("/api/partytown/proxy", async (req) => {
  let url = req.query.url; // Note: Query params are decoded for us already
  // console.log({ url });

  // Some weirdness going on where the url to proxy will sometimes be prefixed with the full page URL again,
  // e.g.
  // https://shop.myshopify.com/apps/partytown/proxy?url=https%3A%2F%2Fshop.myshopify.com%2Fapps%2Fpartytown%2Fproxy%3Furl%3Dhttps%253A%252F%252Fwww.googletagmanager.com%252Fgtag%252Fjs%253Fid%253DUA-237191759-1%2526l%253DdataLayer%2526cx%253Dc
  // So if that is the case, we grab the actual url to proxy again, and decode it.
  if (url?.includes("proxy?url=")) {
    const encodedUrl = url.split("proxy?url=")[1];
    // console.log("proxy: encodedUrl", encodedUrl);
    url = decodeURIComponent(encodedUrl);
    // console.log("proxy: decoded url", url);
  }

  // console.log("proxy:url", url);
  return await fetch(url);
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
