import { JwtPayload } from "jsonwebtoken";
import { IORouter, TContext } from "./router.interface";
export declare type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type TAnyObj = {
    [key: string]: any;
};
export declare type TSource = 'SELF' | 'COMPAL';
export declare type TUSER_TYPE = 'VIEWER' | 'DEVELOPER' | 'ADMIN' | 'ROOT';
export interface IConfig {
    web: {
        client_id: string;
        application_id: string;
        auth_uri: string;
        token_uri: string;
        client_secret: string;
        redirect_uri: string;
    };
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
        SOURCE: TSource;
        USER_TYPE?: TUSER_TYPE;
    };
    token: string;
}
export interface IAPIs extends TAnyObj {
    api: string;
    method: TMethod;
}
export interface IRegistApiScopeBody {
    name: string;
    description: string;
    is_required?: boolean;
    require_check?: boolean;
    is_public?: TPublic;
    apis: IAPIs[];
}
export interface IAPIs extends TAnyObj {
    api: string;
    method: TMethod;
}
export declare type TPublic = 'PUBLIC' | 'PRIVATE';
export interface IRegisterApiScopeRes {
    ID: string;
    NAME: string;
    DESCRIPTION?: string;
    SYSTEM: string;
    APIS: IAPIs[] | string;
    IS_REQUIRED?: boolean;
    IS_PUBLIC?: TPublic;
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
    APIS: IAPIs[];
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
    USER_EMP_NO: string;
    USER_ACCOUNT: string;
    SCOPES: IOauthApplicationScopeAndApiScopeRes[];
    APIS: ({
        api: string;
        method: TMethod;
    } & TAnyObj)[];
}
export interface IError extends Error {
    state?: number | string;
    datas?: any[];
    data?: any;
}
export interface IOapi {
    protocol: string;
    uri: string;
    port?: number;
    get url(): string;
    get config(): IConfig;
    login(body: ILoginbody, options?: TAnyObj): Promise<ILoginRes>;
    registerApiScope(system: string, body: IRegistApiScopeBody[] | IORouter): Promise<IRegisterApiScopeRes[]>;
    verifyToken(ctx: TContext, options: TAnyObj): Promise<IVerifyTokenRes>;
    setConfig(filePath: string): void;
}
