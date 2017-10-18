/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {Column, ColumnModel} from '../model';
import {AbstractController, AutoInject, Restful, Router} from "@a/restful";
import {NewsModel} from "../../news/model/index";

@Restful()
export class ColumnController extends AbstractController {

    constructor() {
        super();
    }

    @AutoInject()
    get columnModel() :ColumnModel {
        return null;
    }
    set columnModel(columnModel: ColumnModel) {
    }

    @AutoInject()
    get newsModel(): NewsModel {return null}
    set newsModel(newsModel: NewsModel) {}

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    async $before(req, res, next) {
        let columns = await this.columnModel.getColumnsByParent(0);
        if (!res.locals._) {
            res.locals._ = {}
        }
        res.locals._.columns = columns;
        next();
    }

    async get(req, res, next) {
        let {id, p, pz} = req.params;
        let obj = await this.columnModel.get(id);
        let news = await this.newsModel.paginate({ columnId: id }, { page: p, pageSize: pz, order: [["isTop", "desc"]] });
        let columns = await this.columnModel.getColumnsByParent(id);
        res.locals.columns = columns;
        res.locals.column = obj;
        res.locals.news = news.toJSON();
        res.view('column/show.html')
    }

    @Router('/:columnId/news/:id')
    async newsShow(req, res, next) {
        let {columnId, id} = req.params;
        let column = await this.columnModel.get(columnId);
        let news = await this.newsModel.get(id);
        if (news.columnId != column.id) {
            return next(403);
        }
        res.locals.column = column;
        res.locals.news = news;
        res.view('news/show.html');
    }

    @Router('/add', 'GET')
    async add(req, res, next) {
        let {name} = req.body || req.query;
        let column = await this.columnModel.save({name});
        res.redirect('./'+ column.id)
    }
}