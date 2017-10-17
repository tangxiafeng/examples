declare var swal;
export default function SaveCtrl($scope, $routeParams, NewsService, ColumnService, $location) {
    var id = $routeParams.id;
    var news;
    if (id) {
        news = NewsService.get({id: id});
    } else {
        news = {
            content: '请在这里添加内容',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    $scope.news = news;
    $scope.categories = [{id: 1, name: '文章'}, {id: 2, name: '图片'}, {id: 3, name: '视频'}];
    $scope.columns = ColumnService.pager({});

    $scope.save = function() {
       NewsService.save($scope.news, function(news) {
            swal("保存成功");
            $location.path('/news/save').search({id: news.id});
       });
    }
}