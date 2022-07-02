// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => httpProxyMiddleware(req, res, {
     // You can use the `http-proxy` option
     target: 'http://localhost:8080',
     changeOrigin: true,
     // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
     pathRewrite: [{
        patternStr: '^/api',
        replaceStr: ''
      }],
});