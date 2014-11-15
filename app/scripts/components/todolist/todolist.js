/**
 * @fileoverview Provides a directive for a to do list component
 */

'use strict';

goog.provide('cheat.application.Directive.ToDoList');

/**
 * A small to do list app with point values assigned. 
 * @constructor
 * @ngInject
 */
cheat.application.Directive.ToDoList = function(TokenService, DataService) {

  this.linkFunc = this.linkFunc.bind(this);

  /** @type {angular.Scope} */
  this.scope;
  /** @type {angular.JQLite} */
  this.elem;
  /** @type {angular.Attributes} */
  this.attrs;
  /** @type {Object} */
  this.TokenService = TokenService;
  /** @type {Object} */
  this.DataService = DataService;
};

/**
 * Todo List Directive factory.
 * @return {Object}
 * @ngInject
 */
cheat.application.Directive.ToDoList.factory = function() {
  var todo = new cheat.application.Directive.ToDoList();
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'scripts/components/todolist/todolist_template.html',
    link: todo.linkFunc,
    controller: todo.controllerFunc,
    controllerAs: 'todo'
  };
};

/**
 * controller function.
 * @ngInject
 */
cheat.application.Directive.ToDoList.prototype.controllerFunc = function(TokenService, DataService) {
    
    this.TokenService = TokenService;
    this.DataService = DataService;
    this.todos = this.DataService.getData('todoList') || [];
    this.createTask = false;

    /*
     * Adds a to do item to the todos array
     */
    this.addTodo = function () {
      this.todos.push({task: this.todo, value: parseInt(this.value)});
      this.todo = '';
      this.value = null;
      this.createTask = false;
      this.DataService.saveData('todoList', this.todos);
    };

    /*
     * Removes a todo from the array
     * @param {number} index The index of the item to splice
     */
    this.removeTodo = function (index) {
      this.todos.splice(index, 1);
      this.DataService.saveData('todoList', this.todos);
    }; 

    /*
     * Marks an item complete and adds tokens to your pool
     * @param {number} index The index of the item to splice
     */
    this.completeTodo = function (index) {
      var completedTodo = this.todos.splice(index, 1);
      this.TokenService.addTokens(completedTodo[0].value);
      this.DataService.saveData('todoList', this.todos);
    };     

    /*
     * Returns the token count for the view
     * @returns {number} Number of tokens
     */
    this.getTokenCount = function() {
      return this.TokenService.getTokenCount();
    };

 
};
 
/**
 * Linking function.
 * @param {angular.Scope} scope
 * @param {angular.JQLite} elem
 * @param {angular.Attributes} attrs
 */
cheat.application.Directive.ToDoList.prototype.linkFunc = function(scope, elem, attrs) {
  this.scope = scope;
  this.elem = elem;
  this.attrs = attrs;
};