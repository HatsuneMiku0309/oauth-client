"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
const router_1 = require("../router");
describe('test', () => {
    it('register koa-router', () => {
        try {
            let ans = [{ name: 'ggininder', description: '', is_required: false, apis: [{ api: '/api/', method: 'GET' }, { api: '/api/test', method: 'GET' }] }];
            let oRouter = router_1.ORouter.getInstance();
            let callback = oRouter.registerApiScope('ggininder');
            callback('GET', '/');
            callback('GET', '/test');
            expect(oRouter.apiScopes).toEqual(ans);
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    });
    it('register express-router', () => {
        try {
            // 繼承 register koa-router ans
            let ans = [
                { name: 'ggininder', description: '', is_required: false, apis: [{ api: '/api/', method: 'GET' }, { api: '/api/test', method: 'GET' }] },
                { name: 'ggininder2', description: '', is_required: false, apis: [{ api: '/api2/', method: 'GET' }, { api: '/api2/test', method: 'GET' }] }
            ];
            let oRouter = router_1.ORouter.getInstance();
            let callback = oRouter.registerApiScope('ggininder2', { rootPath: '/api2' });
            callback('GET', '/');
            callback('GET', '/test');
            expect(oRouter.apiScopes).toEqual(ans);
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    });
});
//# sourceMappingURL=test.test.js.map