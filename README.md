# f-Etsy Proxy

> An "item detail page" from https://etsy.com with four significant and functionally unique modules ("widgets") on the page. This is a recreation of the Reviews module ("widget").

![Sample Etsy Detail Page Screenshot](./ScreenShot.png)

Highlighted Technologies: React, React Semantic UI, Express, mySQL, Jest, Webpack, AWS S3 + EC2

## Getting Started

From within the root directory:

```
npm install
```

All services must be up and running for Proxy to run. Update appropriate IP address and port number for all services in server/index.js lines 7 through 10.

Start the proxy server (on port 3000)

```
npm start
```

## Related Projects

- https://github.com/rpt24sourcandy/fetsyItemImages
- https://github.com/rpt24sourcandy/fetsySeller
- https://github.com/rpt24sourcandy/fetsyReviews
- https://github.com/rpt24sourcandy/fetsyShopping
- https://github.com/rpt24sourcandy/fetsyReviewsProxy
