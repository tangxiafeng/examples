function ListCtrl($scope, NewsService, $routeParams) {
    $scope.routes = [
        {url: '#!/', name: '首页'},
        {url: '#!/news/list', name: '新闻管理'}
    ]
    let {p, pz} = $routeParams;
    $scope.pager = NewsService.pager({p: p, pz: pz})
}

export default ListCtrl; 