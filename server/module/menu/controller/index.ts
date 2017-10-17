/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {Menu, MenuModel} from '../model';
import {AbstractController, AutoInject, Restful, Router} from "@jingli/restful";

@Restful()
export class MenuController extends AbstractController {

    @AutoInject('menuModel')
    get model(): MenuModel {return null}
    set model(menuModel: MenuModel) {}

    constructor() {
        super();
    }

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    async get(req, res, next) {
        let {id} = req.params;
        let obj = await this.model.get(id);
        res.json(obj)
    }

    @Router('/add', 'GET')
    async add(req, res, next) {
        let m;
        if (req.method == 'POST') {
            m = new Menu(req.body);
        } else {
            m = new Menu(req.query);
        }
        let obj = await this.model.save(m);
        res.json(obj);
    }

    async list(req, res, next) {
        let pg = await this.model.paginate({});
        res.json(pg);
    }
}

