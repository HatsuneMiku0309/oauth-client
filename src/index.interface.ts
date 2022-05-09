export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type TAnyObj = { [key: string]: any };

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

export interface IOapi {
    login(body: ILoginbody, options?: TAnyObj): Promise<ILoginRes>;
    registerApiScope(system: string, body: IRegistApiScopeBody[]): Promise<IRegisterApiScopeRes[]>;
}
