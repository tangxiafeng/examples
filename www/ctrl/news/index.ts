
import column from "./column/index";
var moment = require("moment");
import ListCtrl from './list';
import DetailCtrl from './detail';
import SaveCtrl from './save';
import {Column} from "./column/index";

export class NewsModule {
    public list = ListCtrl;
    public detail = DetailCtrl;
    public save = SaveCtrl;

    constructor(public column: Column) {
    }

    index($scope, $routeParams) {
        $scope.locals = {};
        var now = moment().format('YYYY-MM-DD');
        $scope.now = now;
    }
}

var news = new NewsModule(column);

export default news;