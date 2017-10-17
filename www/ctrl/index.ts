/**
 * Created by tangxiafeng on 2017/5/22.
 */
'use strict';

import news from './news';
import menu from './menu';
import {MenuModule} from './menu';
import {NewsModule} from './news';

var ctrls = {
    news: news,
    home: require("./home"),
    menu: menu
}

export {MenuModule};
export {NewsModule};
export default ctrls;