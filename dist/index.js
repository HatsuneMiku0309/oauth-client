"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oapi = void 0;
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
const fs = require("fs");
const got_1 = require("got");
const router_1 = require("./router");
const path = require("path");
const process = require("process");
class Oapi {
    _config;
    _url = '';
    _authorization = '';
    _options = { https: { rejectUnauthorized: false } };
    protocol = '';
    uri = '';
    port;
    constructor(config = {}, options = {}) {
        const { protocol = 'https', uri = 'localhost', port } = config;
        this.protocol = protocol;
        this.uri = uri;
        port !== undefined && (this.port = port);
        this._url = `${this.protocol}://${this.uri}${this.port !== undefined ? `:${this.port}` : ''}`;
        this._options = { ...this._options, ...options };
    }
    get url() {
        return this._url;
    }
    get config() {
        if (!this._config) {
            throw new Error('you should setConfig');
        }
        return this._config;
    }
    setConfig(filePath) {
        try {
            let configString = fs.readFileSync(path.resolve(process.cwd(), filePath)).toString();
            this._config = JSON.parse(configString);
        }
        catch (err) {
            throw err;
        }
    }
    async login(body) {
        try {
            let res = await got_1.default.post(`${this._url}/api/login`, {
                ...this._options,
                json: {
                    account: body.account,
                    password: body.password
                }
            });
            if (!('authorization' in res.headers) ||
                !res.headers.authorization) {
                throw new Error('authorization is empty');
            }
            this._authorization = res.headers.authorization;
            let result = JSON.parse(res.body).data;
            return {
                data: result,
                token: this._authorization
            };
        }
        catch (err) {
            throw err;
        }
    }
    async registerApiScope(system, body) {
        try {
            if (!system) {
                throw new Error('system is empty');
            }
            if (!this._config) {
                throw new Error('you should setConfig');
            }
            let basicToken = `${Buffer.from(`${this._config.web.client_id}:${this._config.web.client_secret}`).toString('base64')}`;
            let _body = body instanceof router_1.ORouter ? body.apiScopes : body;
            let res = await got_1.default.post(`${this._url}/api/api-scope/register/${system}`, {
                ...this._options,
                headers: {
                    Authorization: `Basic ${basicToken}`
                },
                json: _body
            });
            let result = JSON.parse(res.body).data;
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async verifyToken(ctx, options = {}) {
        try {
            if (!this._config) {
                throw new Error('you should setConfig');
            }
            let basicToken = `${Buffer.from(`${this._config.web.client_id}:${this._config.web.client_secret}`).toString('base64')}`;
            let accessToken = ctx.headers.authorization;
            accessToken = accessToken?.replace('Bearer ', '');
            let res = await got_1.default.post(`${this._url}/api/oauth/verify-token`, {
                ...this._options,
                headers: {
                    Authorization: `Basic ${basicToken}`
                },
                json: {
                    access_token: accessToken
                }
            });
            let data = JSON.parse(res.body).data;
            return data;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Oapi = Oapi;
exports.default = Oapi;
// let oapi = new Oapi({ port: 5556 });
// (async () => {
//     await oapi.login({ account: 'cosmo', password: 'test1' });
//     // await oapi.registerApiScope('test', [{
//     //     name: 'oauth-app',
//     //     description: 'test',
//     //     apis: [{
//     //         api: '/oauth-app',
//     //         method: 'GET'
//     //     }]
//     // }, {
//     //     name: 'oauth-app2',
//     //     description: 'test',
//     //     apis: [{
//     //         api: '/oauth-app',
//     //         method: 'GET'
//     //     }]
//     // }]);
//     oapi.setConfig('client_secret123.json');
//     await oapi.verifyToken(<any> {
//         headers: { authorization : 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJSRVNQT05TRV9UWVBFIjoidG9rZW4iLCJPQVVUSF9BUFBMSUNBVElPTl9JRCI6InF3ZSIsIk9BVVRIX0FQUExJQ0FUSU9OX1VTRVJfSUQiOiI3YWZmYjU0ZS1iNDIyLTQ3MmItYjQ0OS02ZGM3NDcyMGU0NDAiLCJVU0VSX0lEIjoic2RhZmRzYWYyMzEyIiwiT0FVVEhfVE9LRU5fSUQiOiJhOTBlMDJmOS00MjIzLTQ1MjQtYWE4Yy1jM2M5M2Q5ZDk3MDciLCJPQVVUSF9TQ09QRVMiOlt7IklEIjoiYTFlMWRjNmUtZTk2Zi00YjJjLWJlZTAtMDc2ZmI5ODZjOWMyIiwiT0FVVEhfQVBQTElDQVRJT05fSUQiOiJxd2UiLCJTQ09QRV9JRCI6IjJkN2E2MDFlLTM1YTMtNGViZS1iZjJiLWFjYzQ4MzcyZjc1ZSIsIk5BTUUiOiJvYXV0aC1hcHAiLCJTWVNURU0iOiJjb3NtbyIsIkRFU0NSSVBUSU9OIjoidGVzdCIsIkFQSVMiOlt7ImFwaSI6Ii9vYXV0aC1hcHAiLCJtZXRob2QiOiJHRVQiLCJwYXJhbXMiOnt9fV0sIklTX1JFUVVJUkVEIjpmYWxzZSwiSVNfRElTQUJMRUQiOmZhbHNlLCJJU19DSEVDS0VEIjp0cnVlLCJDUkVBVEVfVElNRSI6IjIwMjItMDUtMDVUMDc6NDY6NDIuMDAwWiIsIkNSRUFURV9CWSI6IjEyMyIsIlVQREFURV9USU1FIjpudWxsLCJVUERBVEVfQlkiOiIifSx7IklEIjoiYWJkNzlkYzQtZDcxOS00MmNhLWI4NmMtMDk0YjYwYjk2ZWYwIiwiT0FVVEhfQVBQTElDQVRJT05fSUQiOiJxd2UiLCJTQ09QRV9JRCI6ImM3M2Q2MTU0LWJhMTMtNGMxMy04NTQwLWM3NDE1NWQwZjAxYSIsIk5BTUUiOiJvYXV0aC1hcHAyIiwiU1lTVEVNIjoiY29zbW8iLCJERVNDUklQVElPTiI6InRlc3QiLCJBUElTIjpbeyJhcGkiOiIvb2F1dGgtYXBwIiwibWV0aG9kIjoiR0VUIiwicGFyYW1zIjpbIkNRMSIsIkNEMiIsIktTMiJdfV0sIklTX1JFUVVJUkVEIjp0cnVlLCJJU19ESVNBQkxFRCI6ZmFsc2UsIklTX0NIRUNLRUQiOnRydWUsIkNSRUFURV9USU1FIjoiMjAyMi0wNS0wNVQwNzo0Njo0Mi4wMDBaIiwiQ1JFQVRFX0JZIjoiMTIzIiwiVVBEQVRFX1RJTUUiOm51bGwsIlVQREFURV9CWSI6IiJ9LHsiSUQiOiJmYjFhNGY1OS02NWZiLTQ0ZGYtOTk0NS0yN2FjNjcxNTVhMjYiLCJPQVVUSF9BUFBMSUNBVElPTl9JRCI6InF3ZSIsIlNDT1BFX0lEIjoiYzczZDYxNTQtYmExMy00YzEzLTg1NDAtYzc0MTU1ZDBmMDFjIiwiTkFNRSI6Im9hdXRoLWFwcDEiLCJTWVNURU0iOiJjb3NtbyIsIkRFU0NSSVBUSU9OIjoidGVzdCIsIkFQSVMiOlt7ImFwaSI6Ii9vYXV0aC1hcHAiLCJtZXRob2QiOiJHRVQifV0sIklTX1JFUVVJUkVEIjp0cnVlLCJJU19ESVNBQkxFRCI6ZmFsc2UsIklTX0NIRUNLRUQiOnRydWUsIkNSRUFURV9USU1FIjoiMjAyMi0wNS0wNVQwNzo0Njo0Mi4wMDBaIiwiQ1JFQVRFX0JZIjoiMTIzIiwiVVBEQVRFX1RJTUUiOm51bGwsIlVQREFURV9CWSI6IiJ9XSwiaWF0IjoxNjUyMjQ5MDM4LCJleHAiOjE2NTMxNDkwMzh9.fpAaK7k1x-f4KDHm80mTuv9HQorILuCFBWSJ89B6qFltb-X_7Gj2VFZDByWReq5hQYhCAHnBNbH7HmtHWMbFwkg7cHAfFYh8h0JX3UaFKzPPEeztgfPfqj8L7EZFdZe_URZV1E69yQwX1b6QM9rMH1t9glZfTzaeThhe9VgEO6ollKtxN52GcHI86YfE_m7xmw8nbJuXN2XqrwNZgY6GP9NVblqqBFfCGgOH_9u1HlfYyteT5eLvosfsEAnNfyTmDuG0YM6plrqXCiHv4ky4FN_rYODgKx9p3DS7P1BzddbYvGtiiO7DLTGGBRayzRs3JI3neEkjm9If-5uw-ntjcXtE945Wjww-xB9Q742TvEKzqBl1LCxvNhveN1G0wI2_odc5QMgNJGMWhxuOqbbnbfHWQNFrgLvD0CUhKl3Fz0kHtbW9oapGemiR7HGKDX0PPSjQ_DorxzrCT9x3_BGw9LOKC-q-b626CnofYwAXnvdRdO9qNSr3ltGrtW1rqqPGEOIcDZtHr0ezcvhjNFRhH56vrmU53yQvQeWkGrztxn23iINa9YKKc030BX7-DiCsKk0uv-tNypABba4_d2usk9VbNkOyiX-dndZY2JkXSbet4PheVKUs0_0o_yR3L7PM6e7419eUOiFNc7FFn9hT3wzkzZyX6thPwVHKis9vMxM' }
//     });
// })();
//# sourceMappingURL=index.js.map