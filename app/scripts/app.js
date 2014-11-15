'use strict';

goog.require('cheat.application.Directive.ToDoList');
goog.require('cheat.application.Directive.CheatsList');
goog.require('cheat.application.Service.TokenService');
goog.require('cheat.application.Service.DataService');

/**
 * @ngdoc overview
 * @name cheatApp
 * @description
 * # cheatApp
 *
 * Main module of the application.
 */
angular
  .module('cheatApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable' 
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'      
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('TokenService', cheat.application.Service.TokenService)
  .service('DataService', cheat.application.Service.DataService)
  .directive('todo', cheat.application.Directive.ToDoList.factory)
  .directive('cheats', cheat.application.Directive.CheatsList.factory);
