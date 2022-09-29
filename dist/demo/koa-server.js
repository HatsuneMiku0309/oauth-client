"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
const Koa = require("koa");
const Router = require("koa-router");
const index_1 = require("../index");
const middle_1 = require("../middle");
(async () => {
    let app = new Koa();
    let router = new Router();
    let oapi = new index_1.default({ port: 5556 });
    oapi.setConfig('client_secret123.json');
    let a = (0, middle_1.oMiddle)('koa', oapi);
    app.use(a);
    router.get('/api/gogo', (ctx) => {
        ctx.body = { a: 123 };
    });
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(9999);
})();
//# sourceMappingURL=koa-server.js.map