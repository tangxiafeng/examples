/**
 * Created by tangxiafeng on 2016/11/24.
 */


'use strict';
import {Restful, Router} from "@jingli/restful";

@Restful()
export class UploadController {
    constructor(config?: any) {
    }

    private async _upload(req, res, next) {
        res.send('功能开发中,敬请期待!');
    }

    @Router('/image', 'POST')
    async uploadImage(req, res, next) {
        return this._upload(req, res, next);
    }

    @Router('/file', 'POST')
    async uploadFile(req, res, next) {
        return this._upload(req, res, next);
    }

    @Router('/test', 'GET')
    async test(req, res, next) {
        res.send('test')
    }
}