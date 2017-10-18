/**
 * Created by tangxiafeng on 2016/12/6.
 */


'use strict';
import {News, NewsModel} from "../../module/news/model/index";
import {AbstractController, AutoInject, Restful, Router} from "@a/restful";
import {ColumnModel} from "../../module/column/model/index";


@Restful('/admin/news')
export class NewsAdminController extends AbstractController {

    constructor() {
        super();
    }

    @AutoInject()
    get newsModel():NewsModel { return null}
    set newsModel(newsModel: NewsModel) {}

    @AutoInject()
    get columnModel():ColumnModel { return null}
    set columnModel(columnModel: ColumnModel) {}

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    async get(req, res, next):Promise<void> {
        let {id} = req.params;
        let item = await this.newsModel.get(id);
        res.json(item);
    }

    async find(req, res, next):Promise<void> {
        let {p, pz} = req.query;
        let pg = await this.newsModel.paginate({}, {page: p, perPage: pz});
        res.view('admin/news/index.html', {pg: pg})
    }

    async update(req, res, next):Promise<void> {
        let news = req.body;
        news = new News(news);
        news = await this.newsModel.update(news);
        res.json(news);
    }

    async add(req, res, next):Promise<void> {
        let news = req.body;
        news = new News(news);
        news = await this.newsModel.save(news);
        res.json(news);
    }

    @Router('/add')
    async addGet(req, res, next) {
        let news = req.query;
        news = new News(news);
        news = await this.newsModel.save(news);
        res.json(news);
    }

    @Router('/save')
    async save(req, res, next) {
        let {news} = req.body;
        let {id} = req.query;
        let columns = await this.columnModel.fetchAll({});
        if (!news) {
            if (id) {
                news = await this.newsModel.get(id);
            } else {
                news = {};
            }
        }
        res.render('admin/news/save.html', {news: news, columns: columns});
    }

    @Router('/save', 'POST')
    async doSave(req, res, next) {
        let news = req.body;
        if (!news) {
            res.locals.error_msg = '信息不完善';
            req.body.news = news;
            return this.save.bind(this)(req, res, next);
        }
        if (!news.isTop) {
            news.isTop = false;
        }
        if (!news.isRecommend) {
            news.isRecommend = false;
        }
        news = await this.newsModel.save(news);
        res.redirect('/');
    }

    async delete(req, res, next) {
        let {id} = req.params;
        let news = await this.newsModel.get(id);
        let ret = await this.newsModel.destroy(news);
        return res.json(this.reply(0, ret));
    }
}