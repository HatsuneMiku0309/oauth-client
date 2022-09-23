import * as Router from 'koa-router';
import * as express from 'express';
import { ParameterizedContext } from 'koa';
import { IRegistApiScopeBody, TAnyObj, TMethod, TPublic } from './index.interface';

export type TContext = ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>;

export type TServerRouter = Router<any, { }> | express.Router;
export type TRouterMethod = 'get' | 'post' | 'put' | 'delete';
export interface IORouter {
    get apiScopes(): IRegistApiScopeBody[];
    registerApiScope(name: string, options?: { rootPath?: string, description?: string, is_required?: boolean, is_public?: TPublic })
    :(
        method: TMethod, path: string | RegExp, params?: TAnyObj, _options?: TAnyObj & { require_check?: boolean }
    ) => void;
}

