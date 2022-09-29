import { IRegistApiScopeBody, TAnyObj, TMethod, TPublic } from './index.interface';
import { IORouter } from './router.interface';
declare class ORouter implements IORouter {
    static instance: IORouter;
    private _apiScopes;
    constructor();
    static getInstance(): IORouter;
    get apiScopes(): IRegistApiScopeBody[];
    /**
     *
     * @param name
     * @param options rootPath default '/api', is_required default false, is_public default 'PRIVATE'
     * @returns
     */
    registerApiScope(name: string, options?: {
        rootPath?: string;
        description?: string;
        is_required?: boolean;
        is_public?: TPublic;
    }): (method: TMethod, path: string | RegExp, params?: TAnyObj, _options?: TAnyObj & {
        require_check?: boolean;
    }) => void;
}
export { ORouter };
