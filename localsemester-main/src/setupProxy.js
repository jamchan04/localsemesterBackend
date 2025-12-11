const { createProxyMiddleware } = require('http-proxy-middleware');

// Allow overriding via env; fall back to localhost for host dev,
// and backend:4000 for Docker where the service name is reachable.
const candidates = [
  process.env.REACT_APP_API_URL,
  process.env.API_URL,
  'http://localhost:4000',
  'http://backend:4000',
].filter(Boolean);

const target = candidates[0];

/** @param {import('express').Express} app */
module.exports = function setup(app) {
  if (!target) {
    console.warn('[proxy] No API target configured; requests will fail.');
    return;
  }

  const paths = [
    '/auth',
    '/user',
    '/post',
    '/session',
    '/photo',
    '/member',
    '/semester',
    '/semesterComment',
    '/postComment',
    '/uploads',
  ];

  app.use(
    paths,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
    }),
  );

  console.log(`[proxy] Forwarding API calls to ${target}`);
};
