/**
 * Created by tangxiafeng on 2016/11/29.
 */


'use strict';
import {NewsModel} from "../news/model/index";
import {AutoInject, Restful, Router} from "@a/restful";
import {ColumnModel} from "../column/model/index";

@Restful('/')
export class HomeController {

    @AutoInject()
    get newsModel(): NewsModel {return null}
    set newsModel(newsModel: NewsModel) {}

    @AutoInject()
    get columnModel() :ColumnModel { return null}
    set columnModel(columnModel: ColumnModel) {}

    async $before(req, res, next) {
        let columns = await this.columnModel.getColumnsByParent(0);
        if (!res.locals._) {
            res.locals._ = {}
        }
        res.locals._.columns = columns;
        next();
    }

    @Router('/')
    async index(req, res, next) {
        let {p, pz} = req.query;
        if (!pz) {
            pz = 20;
        }
        let pager = await this.newsModel.paginate({}, {page: p, pageSize: pz});
        res.locals.pager = pager.toJSON();
        res.view('home/home.html');
    }
}