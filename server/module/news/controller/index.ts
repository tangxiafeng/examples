/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {NewsModel, News} from '../model';
import {AbstractController, AutoInject, Restful, Router} from "@jingli/restful";
import {ColumnModel} from "../../column/model/index";

@Restful()
export class NewsController extends AbstractController {
    constructor() {
        super();
    }

    @AutoInject()
    set newsModel(newsModel: NewsModel) {}
    get newsModel(): NewsModel {return null}

    @AutoInject()
    set columnModel(columnModel: ColumnModel) {}
    get columnModel(): ColumnModel {return null}

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    async $before(req, res, next) {
        if (!res.locals._) {
            res.locals._ = {};
        }
        let columns = await this.columnModel.getColumnsByParent(0);
        res.locals._.columns = columns;
        next();
    }

    async get(req, res, next) {
        let {id} = req.params;
        let obj = await this.newsModel.get(id);
        let column;
        if (obj) {
            column = await this.columnModel.get(obj.columnId);
        }
        let nextNews = await this.newsModel.getNext(id);
        let lastNews = await this.newsModel.getLast(id);
        res.view('news/show.html', {news: obj, column, nextNews, lastNews});
    }

    async query(req, res, next) {
        let pg = await this.newsModel.paginate({});
        res.view('news/list.html', {paginate: pg.toJSON()});
    }
}
