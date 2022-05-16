import { install } from 'source-map-support';
install();

import { IRegistApiScopeBody, TAnyObj, TMethod } from './index.interface';
import { IORouter } from './router.interface';

class ORouter implements IORouter {
    static instance: IORouter;
    private _apiScopes: IRegistApiScopeBody[] = [];
    constructor() {

    }

    static getInstance() {
        if (!ORouter.instance) {
            ORouter.instance = new ORouter();
        }

        return ORouter.instance;
    }

    get apiScopes(): IRegistApiScopeBody[] {
        return this._apiScopes;
    }

    /**
     * 
     * @param name 
     * @param options rootPath default '/api', is_required default false
     * @returns 
     */
    registerApiScope(
        name: string, options?: { rootPath?: string, description?: string; is_required?: boolean; }
    ): (method: TMethod, path: string | RegExp, params?: TAnyObj, _options?: TAnyObj & { require_check?: boolean }) => void {
        const { rootPath = '/api', description = '', is_required = false } = options || { };
        let findApiScope = this._apiScopes.find((apiScope) => { return apiScope.name === name; });
        if (!findApiScope) {
            this._apiScopes.push({
                name,
                description,
                is_required,
                require_check: false,
                apis: []
            });
        } else {
            if (description !== findApiScope.description || is_required !== findApiScope.is_required) {
                console.log('Warnning! you can\'t reset [description / is_required]');
            }
        }

        return (method: TMethod, path: string | RegExp, params: TAnyObj = { }, _options: TAnyObj & { require_check?: boolean } = { }) => {
            const { require_check = false } = _options;
            if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
                throw new Error('[method] error');
            }
            if (typeof path === 'string' && path === '') {
                throw new Error('path is required');
            }
            if (typeof path !== 'string' && !(path instanceof RegExp)) {
                throw new Error('[path] Unknown type');
            }

            let _findApiScope = this._apiScopes.find((apiScope) => { return apiScope.name === name; });
            if (_findApiScope) {
                !!require_check && (_findApiScope.require_check = require_check);
                let findApisIndex = _findApiScope.apis.findIndex((api) => api.api === `${rootPath}${path}` && api.method === method);
                if (findApisIndex !== -1) {
                    throw new Error(`Duplicate register Api in [${name}-${method}]`);
                }
                _findApiScope.apis.push({ ...params, api: `${rootPath}${path}`, method: method });
            } else {
                throw new Error('have bug... QAQ');
            }
        };
    }

}

export {
    ORouter
};
