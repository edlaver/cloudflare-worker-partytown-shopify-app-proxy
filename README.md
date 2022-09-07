- [ ] Install dependencies: `npm i`
- [ ] Run locally: `npm run start` (to preview on http://localhost:8787)
- [ ] Check Partytown libs can be proxied: `/api/partytown/lib/partytown.js`
- [ ] Check resolved urls can be proxied: `/api/partytown/proxy?url=https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js`
- [ ] npm run deploy (to deploy to Cloudflare at: `https://cloudflare-worker-partytown-shopify-app-proxy.{your cloudflare account name}.workers.dev`
- [ ] Set the Proxy URL setting in your App > App setup > App Proxy to: `https://cloudflare-worker-partytown-shopify-app-proxy.{your cloudflare account name}.workers.dev/api/partytown/`
![App proxy setup screenshot](/assets/app-proxy-setup.png)
- [ ] Copy the contents of `./liquid/partytown.liquid` into your `theme.liquid` file, before the closing `<head>` tag.
- [ ] Ensure you've disabled Google Analytics anywhere else it might be enabled in your Theme.  See: https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup#step-3-enable-google-analytics (Do the opposite of Step 13, and clear the Google Analytics code if set)
![App proxy setup screenshot](/assets/google-analytics-setup.png)
- [ ] Party! 🎉