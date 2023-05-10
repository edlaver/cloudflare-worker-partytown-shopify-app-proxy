> See: https://bit.ly/partysh0p for the why and how.

- [ ] Install dependencies: `npm i`
- [ ] Run locally: `npm run start` (to preview on http://localhost:8787)
- [ ] Check Partytown libs can be proxied: `http://localhost:8787/api/partytown/lib/partytown.js`
- [ ] Check resolved urls can be proxied: `http://localhost:8787/api/partytown/proxy?url=https%3A%2F%2Fwww.google-analytics.com%2Fanalytics.js`
- [ ] Deploy to Cloudflare: `npm run deploy` e.g. `https://cloudflare-worker-partytown-shopify-app-proxy.{your cloudflare account name}.workers.dev`
- [ ] Set the Proxy URL setting in your App > App setup > App Proxy to: `https://cloudflare-worker-partytown-shopify-app-proxy.{your cloudflare account name}.workers.dev/api/partytown/`  
       ![App proxy setup screenshot](/assets/app-proxy-setup.png)
  - See: https://shopify.dev/apps/online-store/app-proxies
- [ ] Copy the contents of `./liquid/partytown.liquid` into your `theme.liquid` file, before the closing `</head>` tag, and configure to meet your needs.
- [ ] Save changes to `theme.liquid`
- [ ] Ensure you've disabled Google Analytics anywhere else it might be enabled in your Theme.
  - See: https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup#step-3-enable-google-analytics
  - Do the opposite of Step 13, and clear the Google Analytics code if set
    ![Google analytics setup screenshot](/assets/google-analytics-setup.png)
- [ ] Open Dev Tools (`F12`) in Chrome/Edge and reload your site.
- [ ] Check in the Network tab that the Partytown scripts are loaded successfully and the service worker is accessing the network (service worker requests show a little cog icon next to them):
      ![Network tab output screenshot](/assets/network-debug.png)
- [ ] Check that you're getting some Partytown debug messages in the Console tab:
      ![Console tab output screenshot](/assets/console-debug-output.png)
- [ ] Check in Google Analytics that user events are being tracked (e.g. the active user count shows you browsing the site). It may take a minute or two for Google Analytics to start showing events, so be patient.
      ![Google analytics screenshot](/assets/google-analytics-output.png)
- [ ] Once you're happy Partytown is working correctly, you can set the `assign partytown_use_debug_mode` to `false` in the `theme.liquid` file for performance benefits.
- [ ] You can benchmark the difference Partytown makes by toggling the `assign partytown_use_partytown` setting on and off in the `theme.liquid` file, and then running Google PageSpeed Insights: https://pagespeed.web.dev/

  - Remember to set `assign partytown_use_debug_mode` to `false` as well to get the best performance
  - Note: PageSpeed Insights will only work with public sites, not with password protected sites
  - To evaluate password protected sites, use the Lighthouse report option in Dev Tools (`F12`) instead.
  - Partytown **disabled**:
    ![Lighthouse score screenshot - Partytown disabled](/assets/lighthouse-score-partytown-disabled.png)
  - Partytown **enabled**:
    ![Lighthouse score screenshot - Partytown enabled](/assets/lighthouse-score-partytown-enabled.png)

- [ ] Party! 🎉
