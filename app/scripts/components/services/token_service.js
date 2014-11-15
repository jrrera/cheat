/**
 * @fileoverview Provides the service for shuttling token data
 *  from todo list to cheats componenet for redeeming rewards
 */

'use strict';

goog.provide('cheat.application.Service.TokenService');

/**
 * @ngInject
 * @param {!angular.$http} $http The Angular http service.
 * @param {!angular.$q} $q The Angular q service.
 * @constructor
 */
cheat.application.Service.TokenService = function($http, $q, DataService) {
  /**
   * @type {!angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {!angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {Object}
   * @private
   */
  this.DataService = DataService;

  /**
   * @type {Object.<number>}  
   * @const 
   */
  this.DEFAULT_TOKEN_CACHE = { 
    tokenCount: 0 
  };

  /**
   * @type {!Object}
   * @private
   */
  this.tokenCache_ = this.restoreTokenData() || this.DEFAULT_TOKEN_CACHE;
};


/**
* Returns the token data object
* @return {Object} tokenCache_
*/
cheat.application.Service.TokenService.prototype.getTokenCount = function() { 
  return this.tokenCache_.tokenCount;
};

/**
* Saves token data to localStorage
* @return {boolean} True if successful, false if error
*/
cheat.application.Service.TokenService.prototype.saveTokenData = function() { 
  var result = this.DataService.saveData('tokenData', this.tokenCache_);
  return (result ? true : false);
};

/**
* Checks for token data in localstorage (eventually the server)
* @return {Object|null} Returns stored data, else null if error or not found
*/
cheat.application.Service.TokenService.prototype.restoreTokenData = function() { 
  return this.DataService.getData('tokenData');
};

/**
* Adds the number of tokens we have saved
* @param {number} newToken The amount of tokens to add to the token cache
* @return {number} Total score count
*/
cheat.application.Service.TokenService.prototype.addTokens = function(newTokens) {
  this.tokenCache_.tokenCount += newTokens;

  console.log(this.tokenCache_.tokenCount); 
  this.saveTokenData();

  return this.tokenCache_.tokenCount;
};


/**
* Substracts the number of tokens we have saved when redeeming a cheat
* @param {number} newToken The amount of tokens to add to the token cache
* @return {number} Total score count
*/
cheat.application.Service.TokenService.prototype.removeTokens = function(tokenCost) {
  this.tokenCache_.tokenCount -= tokenCost;

  console.log(this.tokenCache_.tokenCount); 
  this.saveTokenData();

  return this.tokenCache_.tokenCount;
};