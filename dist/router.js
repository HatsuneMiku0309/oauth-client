"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORouter = void 0;
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
class ORouter {
    static instance;
    _apiScopes = [];
    constructor() {
    }
    static getInstance() {
        if (!ORouter.instance) {
            ORouter.instance = new ORouter();
        }
        return ORouter.instance;
    }
    get apiScopes() {
        return this._apiScopes;
    }
    /**
     *
     * @param name
     * @param options rootPath default '/api', is_required default false, is_public default 'PRIVATE'
     * @returns
     */
    registerApiScope(name, options) {
        const { rootPath = '/api', description = '', is_required = false, is_public = 'PRIVATE' } = options || {};
        let findApiScope = this._apiScopes.find((apiScope) => { return apiScope.name === name; });
        if (!findApiScope) {
            this._apiScopes.push({
                name,
                description,
                is_required,
                is_public,
                require_check: false,
                apis: []
            });
        }
        else {
            if (description !== findApiScope.description || is_required !== findApiScope.is_required) {
                console.log('Warnning! you can\'t reset [description / is_required]');
            }
        }
        return (method, path, params = {}, _options = {}) => {
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
            }
            else {
                throw new Error('have bug... QAQ');
            }
        };
    }
}
exports.ORouter = ORouter;
//# sourceMappingURL=router.js.map