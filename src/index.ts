import { install } from 'source-map-support';
install();

import { ILoginbody, ILoginRes, IOapi, IRegistApiScopeBody, IRegisterApiScopeRes, TAnyObj } from './index.interface';
import got from 'got';

class Oapi implements IOapi {
    private _url: string = '';
    private _authorization: string = '';
    private _options: TAnyObj & { rejectUnauthorized: boolean } = { rejectUnauthorized: false };
    protocol: string = '';
    uri: string = '';
    port?: number;
    constructor(
        config: { protocol?: string, uri?: string, port?: number } = { },
        options: TAnyObj = { }
    ) {
        const { protocol = 'https', uri = 'localhost', port } = config;
        this.protocol = protocol;
        this.uri = uri;
        port !== undefined && (this.port = port);
        this._url = `${this.protocol}://${this.uri}${this.port !== undefined ? `:${this.port}` : ''}`;
        this._options = { ...this._options, ...options };
    }

    async login(body: ILoginbody): Promise<ILoginRes> {
        try {
            let res = await got.post(`${this._url}/api/login`, {
                ...this._options,
                json: {
                    account: body.account,
                    password: body.password
                }
            });
            if (
                !('authorization' in res.headers) ||
                !res.headers.authorization
            ) {
                throw new Error('authorization is empty');
            }

            this._authorization = <string> res.headers.authorization;
            let result = JSON.parse(res.body).data;

            return result;
        } catch (err) {
            throw err;
        }
    }

    async registerApiScope(system: string, body: IRegistApiScopeBody[]): Promise<IRegisterApiScopeRes[]> {
        try {
            if (system === '') {
                throw new Error('system is empty');
            }

            let res = await got.post(`${this._url}/api/api-scope/register/${system}`, {
                ...this._options,
                headers: {
                    Authorization: this._authorization
                },
                json: body
            });
            let result = JSON.parse(res.body).data;

            return result;
        } catch (err) {
            throw err;
        }
    }
}


export default Oapi;
export {
    Oapi
};

let oapi = new Oapi({ port: 5556 });
(async () => {
    await oapi.login({ account: 'cosmo', password: 'test1' });
    await oapi.registerApiScope('test', [{
        name: 'oauth-app',
        description: 'test',
        apis: [{
            api: '/oauth-app',
            method: 'GET'
        }]
    }, {
        name: 'oauth-app2',
        description: 'test',
        apis: [{
            api: '/oauth-app',
            method: 'GET'
        }]
    }]);
})();
