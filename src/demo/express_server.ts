import { install } from 'source-map-support';
install();

import * as express from 'express';
import Oapi from '../index';
import { oMiddle } from '../middle';

(async () => {
    let app = express();
    let router = express.Router();

    let oapi = new Oapi({ port: 5556 });
    oapi.setConfig('client_secret123.json');

    let a = await oMiddle<express.Express>('express', oapi);

    app.use(a);

    router.get('/api/gogo', (req, res, next) => {
        res.send('test1');
    });

    app.use(router);

    app.listen(9999);
})();
