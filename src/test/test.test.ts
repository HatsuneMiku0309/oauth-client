import { install } from 'source-map-support';
install();

import { ORouter } from '../router';

describe('test', () => {
    it('register koa-router', () => {
        try {
            let ans = [{ name: 'ggininder', description: '', is_required: false, apis: [{ api: '/api/', method: 'GET' }, { api: '/api/test', method: 'GET' }] }];
            let oRouter = ORouter.getInstance();
            let callback = oRouter.registerApiScope('ggininder');
            callback('GET', '/');
            callback('GET', '/test');
            expect(oRouter.apiScopes).toEqual(ans);
        } catch (err: any) {
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

            let oRouter = ORouter.getInstance();
            let callback = oRouter.registerApiScope('ggininder2', { rootPath: '/api2' });
            callback('GET', '/');
            callback('GET', '/test');
            expect(oRouter.apiScopes).toEqual(ans);
        } catch (err: any) {
            console.error(err.message);
            throw err;
        }
    });
});
