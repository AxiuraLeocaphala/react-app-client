import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    // Проксирование маршрутов на сервер 1
    app.use(
        '/product-api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:3001',
            secure: false, // В будущем изменить на true для проверки ssl-сертификата целеого сервера и предотварещения MITM-атаки, когда кто-то пытается подменить сервер
            changeOrigin: true, // Подменяет заголовок Host на целевой сервер
            pathRewrite: {
                '^/product-api': '',
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log('Before: ', proxyRes.headers);
                if (proxyRes.headers['Server']) {
                    delete proxyRes.headers['Server'];
                }
                if (proxyRes.headers['Access-Control-Allow-Headers']) {
                    delete proxyRes.headers['Access-Control-Allow-Headers'];
                }
                if (proxyRes.headers['Access-Control-Allow-Methods']) {
                    delete proxyRes.headers['Access-Control-Allow-Methods'];
                }
                console.log('After: ', proxyRes.headers);
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Something went wrong with the proxy');
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
            onProxyRes: (proxyRes, req, res) => {
                console.log('Before: ', proxyRes.headers);
                if (proxyRes.headers['Server']) {
                    delete proxyRes.headers['Server'];
                }
                if (proxyRes.headers['Access-Control-Allow-Headers']) {
                    delete proxyRes.headers['Access-Control-Allow-Headers'];
                }
                if (proxyRes.headers['Access-Control-Allow-Methods']) {
                    delete proxyRes.headers['Access-Control-Allow-Methods'];
                }
                console.log('After: ', proxyRes.headers);
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Something went wrong with the proxy');
            },
        })
    );
}