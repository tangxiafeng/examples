/**
 * Created by tangxiafeng on 2016/12/6.
 */


'use strict';
import {Menu, MenuModel} from "../../module/menu/model/index";
import {AbstractController, AutoInject, Restful} from "@restful";


@Restful()
export class MenuAdminController extends AbstractController {

    @AutoInject()
    set menuModel(menuModel: MenuModel) {}
    get menuModel() :MenuModel {
        return null;
    }

    constructor() {
        super();
    }

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    async get(req, res, next):Promise<void> {
        let {id} = req.params;
        let item = await this.menuModel.get(id);
        res.json(item);
    }

    async query(req, res, next):Promise<void> {
        let {p, pz} = req.query;
        let pg = await this.menuModel.paginate({}, {page: p, perPage: pz});
        res.json(pg);
    }

    async update(req, res, next):Promise<void> {
        let menu = req.body;
        menu = new Menu(menu);
        menu = await this.menuModel.update(menu);
        res.json(menu);
    }

    async add(req, res, next):Promise<void> {
        let menu = req.body;
        menu = new Menu(menu);
        menu = await this.menuModel.save(menu);
        res.json(menu);
    }
}