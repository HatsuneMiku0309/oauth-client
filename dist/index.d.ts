import { IConfig, ILoginbody, ILoginRes, IOapi, IRegistApiScopeBody, IRegisterApiScopeRes, IVerifyTokenRes, TAnyObj } from './index.interface';
import { IORouter, TContext } from './router.interface';
declare class Oapi implements IOapi {
    private _config?;
    private _url;
    private _authorization;
    private _options;
    protocol: string;
    uri: string;
    port?: number;
    constructor(config?: {
        protocol?: string;
        uri?: string;
        port?: number;
    }, options?: TAnyObj);
    get url(): string;
    get config(): IConfig;
    setConfig(filePath: string): void;
    login(body: ILoginbody): Promise<ILoginRes>;
    registerApiScope(system: string, body: IRegistApiScopeBody[] | IORouter): Promise<IRegisterApiScopeRes[]>;
    verifyToken(ctx: TContext, options?: TAnyObj): Promise<IVerifyTokenRes>;
}
export default Oapi;
export { Oapi };
