/*
    1. Настроить proxy на работу по https
    2. 
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // Проксирование маршрутов на сервер 1
    app.use(
        '/product-api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:3001',
            changeOrigin: true,
            pathRewrite: {
                '^/product-api': '',
            },
        })
    );
    // Проксирование маршрутов на сервер 2
    app.use(
        '/user-api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:3002',
            changeOrigin: true,
            pathRewrite: {
                '^/user-api': '',
            },
        })
    );
}