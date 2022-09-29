import { Express } from 'express';
import * as Koa from 'koa';
import { IOapi, TAnyObj } from './index.interface';
export declare function oMiddle<T = Koa.Middleware | Express>(type: 'express' | 'koa', callback: IOapi, options?: TAnyObj & {
    ignoresApi?: string[];
}): T;
