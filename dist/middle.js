"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oMiddle = void 0;
const source_map_support_1 = require("source-map-support");
(0, source_map_support_1.install)();
function oMiddle(type, callback, options = {}) {
    const { ignoresApi = [] } = options;
    if (type === 'koa') {
        let r = async (ctx, next) => {
            try {
                if (!new RegExp(ignoresApi.join('|')).test(ctx.url) || ignoresApi.length === 0) {
                    let result = await callback.verifyToken(ctx, options);
                    if (result.ACTIVE === false) {
                        throw new Error('token verify fail');
                    }
                    ctx.state.oauth = result;
                }
                else {
                    ctx.state.oauth = true;
                }
                await next();
            }
            catch (err) {
                let _err = err;
                _err.state = err.response.status;
                ctx.body = JSON.parse(err.response.body);
            }
        };
        return r;
    }
    else if (type === 'express') {
        let r = async (req, res, next) => {
            try {
                let url = req.url.split('?')[0];
                if (!new RegExp(ignoresApi.join('|')).test(url) || ignoresApi.length === 0) {
                    let result = await callback.verifyToken({
                        headers: { authorization: req.headers.authorization }
                    }, options);
                    if (result.ACTIVE === false) {
                        throw new Error('token verify fail');
                    }
                    req.oauth = result;
                }
                else {
                    req.oauth = true;
                }
                await next();
            }
            catch (err) {
                if (!!err.response) {
                    let errBody = JSON.parse(err.response.body);
                    res.status(err.response.statusCode).json(errBody);
                }
                else {
                    res.status(500).json({ message: err.message });
                }
                res.end();
            }
        };
        return r;
    }
    else {
        throw new Error('Unkowns type');
    }
}
exports.oMiddle = oMiddle;
//# sourceMappingURL=middle.js.map