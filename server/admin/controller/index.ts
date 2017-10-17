/**
 * Created by tangxiafeng on 2016/11/21.
 */

'use strict';
import {Restful, Router} from '@jingli/restful';

@Restful('/admin')
export class AdminController {

    @Router('/login')
    async login(req, res, next) {
        res.send("login");
    }
}