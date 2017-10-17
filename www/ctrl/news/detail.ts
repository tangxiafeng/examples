function DetailCtrl($scope, $routeParams, NewsService) {
    let id = $routeParams.id;
    $scope.news = NewsService.get({id: id});
    console.log($scope.news)
}

export default DetailCtrl;