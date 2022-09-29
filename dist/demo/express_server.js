"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
const express = require("express");
const index_1 = require("../index");
const middle_1 = require("../middle");
(async () => {
    let app = express();
    let router = express.Router();
    let oapi = new index_1.default({ port: 5556 });
    oapi.setConfig('client_secret123.json');
    let a = (0, middle_1.oMiddle)('express', oapi);
    app.use(a);
    router.get('/api/gogo', (req, res, next) => {
        res.send('test1');
    });
    app.use(router);
    app.listen(9999);
})();
//# sourceMappingURL=express_server.js.map