/**
 * @fileoverview Provides a directive for a to do list component
 */

'use strict';

goog.provide('cheat.application.Directive.CheatsList');

/**
 * A small to do list app with point values assigned. 
 * @constructor
 * @ngInject
 */
cheat.application.Directive.CheatsList = function() {

  this.linkFunc = this.linkFunc.bind(this);

  /** @type {angular.Scope} */
  this.scope;
  /** @type {angular.JQLite} */
  this.elem;
  /** @type {angular.Attributes} */
  this.attrs;
  /** @type {Object} */
  this.TokenService;
  /** @type {Object} */
  this.DataService;
};

/**
 * Todo List Directive factory.
 * @return {Object}
 */
cheat.application.Directive.CheatsList.factory = function() {
  var cheater = new cheat.application.Directive.CheatsList();
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'scripts/components/cheatlist/cheats_template.html',
    link: cheater.linkFunc,
    controller: cheater.controllerFunc,
    controllerAs: 'cheat'
  };
};

/**
 * controller function.
 * @ngInject
 */
cheat.application.Directive.CheatsList.prototype.controllerFunc = function(TokenService, DataService) {
    
    this.TokenService = TokenService;
    this.DataService = DataService;
    this.cheats = this.DataService.getData('cheatsList') || [];
    this.createTask = false;

    /*
     * Adds a to do item to the cheats array
     */
    this.addCheat = function () {
      if (isNaN(parseInt(this.value))) {
        alert('Please input a number for the cost of your cheat. :)');
        return;
      }

      this.cheats.push({cheatItem: this.cheatItem, value: parseInt(this.value)});
      
      // Null everything out
      this.cheatItem = '';
      this.value = null;
      this.createTask = false;
      
      this.DataService.saveData('cheatsList', this.cheats);
    };

    /*
     * Removes a cheat from the array
     * @param {number} index The index of the item to splice
     */
    this.removeCheat = function (index) {
      this.cheats.splice(index, 1);
      this.DataService.saveData('cheatsList', this.cheats);
    }; 

    /*
     * Redeems a cheat and removes the tokens from your pool
     * @param {number} index The index of the item to splice
     * @returns {string|boolean} String of cheat name if successful, 
     *     false if failure
     */
    this.redeemCheat = function (index) {
      var tokenCount = TokenService.getTokenCount(),
        cheatCost = parseInt(this.cheats[index].value),
        redeemedCheat;

      if (tokenCount < cheatCost) {
        alert('You only have ' + tokenCount + ' tokens. Redeem this once you have enough. :)')
        return false;
      }

      if (confirm('Are you sure you want to redeem?')) {
        redeemedCheat = this.cheats.splice(index, 1);
        this.TokenService.removeTokens(cheatCost);
        this.DataService.saveData('cheatsList', this.cheats);
      }

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
cheat.application.Directive.CheatsList.prototype.linkFunc = function(scope, elem, attrs) {
  this.scope = scope;
  this.elem = elem;
  this.attrs = attrs;
};