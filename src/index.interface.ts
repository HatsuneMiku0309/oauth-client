import { JwtPayload } from "jsonwebtoken";
import { IORouter, TContext } from "./router.interface";

export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type TAnyObj = { [key: string]: any };

export interface IConfig {
    web: {
        client_id: string;
        application_id: string;
        auth_uri: string;
        token_uri: string;
        client_secret: string;
        redirect_uri: string;
    }
}

export interface ILoginbody {
    account: string;
    password: string;
}

export interface ILoginRes {
    data: {
        ID: string;
        ACCOUNT: string;
        EMAIL: string;
        PHONE: string;
    }
    token: string;
}

export interface IRegistApiScopeBody {
    name: string,
    description: string;
    is_required?: boolean;
    apis: {
        api: string;
        method: TMethod;
        [key: string]: any;
    }[]
}

export interface IAPIs extends TAnyObj {
    api: string;
    method: TMethod;
}

export type TPublic = 'PUBLIC' | 'PRIVATE';

export interface IRegisterApiScopeRes {
    ID: string;
    NAME: string;
    DESCRIPTION?: string;
    SYSTEM: string;
    APIS: IAPIs[] | string; // setting string type because JSON.stringify(apis)
    IS_REQUIRED?: boolean; // default: 0
    IS_PUBLIC?: TPublic; // default: 'PRIVATE'
    CREATE_TIME?: Date;
    CREATE_BY: string;
    UPDATE_TIME?: Date;
    UPDATE_BY?: string;
}

export interface IOauthApplicationScopeAndApiScopeRes {
    ID: string;
    OAUTH_APPLICATION_ID: string;
    SCOPE_ID: string;
    NAME: string;
    SYSTEM: string;
    DESCRIPTION: string;
    APIS: IAPIs[],
    IS_REQUIRED: boolean;
    IS_DISABLED: boolean;
    IS_CHECKED: boolean;
    CREATE_TIME: Date;
    CREATE_BY: string;
    UPDATE_TIME: Date;
    UPDATE_BY: string;
}

export interface IVerifyTokenRes extends JwtPayload {
    ACTIVE: boolean;
    CLIENT_ID: string;
    USER_ID: string;
    SCOPES: IOauthApplicationScopeAndApiScopeRes[];
}

export interface IError extends Error {
    state?: number | string;
    datas?: any[];
    data?: any;
}

export interface IOapi {
    login(body: ILoginbody, options?: TAnyObj): Promise<ILoginRes>;
    registerApiScope(system: string, body: IRegistApiScopeBody[] | IORouter): Promise<IRegisterApiScopeRes[]>;
    verifyToken(ctx: TContext, options: TAnyObj): Promise<IVerifyTokenRes>;
    setConfig(filePath: string): void;
}
