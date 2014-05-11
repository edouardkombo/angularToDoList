
var app = angular.module('todo', []);

app.directive('ngBlur', function(){
    return function(scope, elem, attr){
        elem.bind('blur', function(){
            scope.$apply(attr.ngBlur);
        });
    };
});

app.controller('todoController', function($scope, filterFilter, $http, $location) {

    $scope.todos = [];
    $scope.placeholder = 'Loading...';
    $scope.statusFilter = [];
    
    $http.get('../todos.php').success(function(data){
        $scope.todos = data;
        $scope.placeholder = 'Add a new task';
    });
    
    $scope.$watch('todos', function(){
        $scope.remaining = filterFilter($scope.todos, {completed:true}).length;
        $scope.allChecked = !$scope.remaining;
    }, true);
    
    if ($location.path === '') { $location.path('/') }
    $scope.location = $location;
    
    $scope.$watch('location.path()', function(path){
        $scope.statusFilter = 
            (path === 'active') ? {completed: false} : 
            (path === '/done') ? {completed: true} : 
            null; 
    });
    
    $scope.removeTodo = function(index) {
        $scope.todos.splice(index, 1);
    };
    
    $scope.addTodo = function (){
        $scope.todos.push({
            name: $scope.newTodo,
            completed: true
        });
        $scope.newTodo = '';
    };
    
    $scope.editTodo = function (todo){
        todo.editing = false;
    };
    
    $scope.checkAllTodo = function(allChecked) {
        $scope.todos.forEach(function(todo){
            todo.completed = allChecked;
        });
    };
});


