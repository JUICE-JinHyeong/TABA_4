// src/main/frontend/src/setProxy.js
// 프론트엔드에서 /api로 요청을 보내면 그 요청이 8080port로 간다.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
      secure: false,
    })
  );
};