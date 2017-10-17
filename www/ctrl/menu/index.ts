/**
 * Created by tangxiafeng on 2017/6/10.
 */

'use strict';

import ListController from './list';
import SaveController from './save';

export class MenuModule {
    constructor() {
    }

    list = ListController;
    save = SaveController;
}

var menu = new MenuModule();
export default menu;