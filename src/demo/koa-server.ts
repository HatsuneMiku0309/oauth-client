import { install } from 'source-map-support';
install();

import * as Koa from 'koa';
import * as Router from 'koa-router';
import Oapi from '../index';
import { oMiddle } from '../middle';

(async () => {
    let app = new Koa();
    let router = new Router();

    let oapi = new Oapi({ port: 5556 });
    oapi.setConfig('client_secret123.json');
    let a = await oMiddle<Koa.Middleware>('koa', oapi);
    app.use(a);

    router.get('/api/gogo', (ctx) => {
        ctx.body = { a: 123 };
    });

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(9999);
})();
